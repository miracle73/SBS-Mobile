import ReactNativeBlobUtil from "react-native-blob-util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://sbsapp.com.ng";
const CACHE_DIR = ReactNativeBlobUtil.fs.dirs.DocumentDir + "/sbs_image_cache";
const CACHE_INDEX_KEY = "imageCacheIndex";

interface CacheIndex {
  [remotePath: string]: string; // remotePath -> localPath
}

class ImageCacheService {
  private cacheIndex: CacheIndex = {};
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    try {
      // Ensure cache directory exists
      const exists = await ReactNativeBlobUtil.fs.isDir(CACHE_DIR);
      if (!exists) {
        await ReactNativeBlobUtil.fs.mkdir(CACHE_DIR);
      }
      // Load cache index
      const stored = await AsyncStorage.getItem(CACHE_INDEX_KEY);
      if (stored) {
        this.cacheIndex = JSON.parse(stored);
      }
      this.initialized = true;
    } catch (error) {
      console.error("ImageCacheService init error:", error);
    }
  }

  // Check if images for a topic are cached
  async areImagesCached(imagePaths: string[]): Promise<boolean> {
    await this.init();
    if (imagePaths.length === 0) return false;
    for (const path of imagePaths) {
      if (!this.cacheIndex[path]) return false;
      const exists = await ReactNativeBlobUtil.fs.exists(this.cacheIndex[path]);
      if (!exists) return false;
    }
    return true;
  }

  // Get local paths for cached images (returns null if not fully cached)
  async getCachedImages(imagePaths: string[]): Promise<string[] | null> {
    await this.init();
    const localPaths: string[] = [];
    for (const path of imagePaths) {
      const localPath = this.cacheIndex[path];
      if (!localPath) return null;
      const exists = await ReactNativeBlobUtil.fs.exists(localPath);
      if (!exists) return null;
      localPaths.push("file://" + localPath);
    }
    return localPaths;
  }

  // Download and cache images for a topic
  async cacheImages(
    imagePaths: string[],
    onProgress?: (downloaded: number, total: number) => void
  ): Promise<string[]> {
    await this.init();
    const localPaths: string[] = [];

    for (let i = 0; i < imagePaths.length; i++) {
      const remotePath = imagePaths[i];

      // Check if already cached
      if (this.cacheIndex[remotePath]) {
        const exists = await ReactNativeBlobUtil.fs.exists(
          this.cacheIndex[remotePath]
        );
        if (exists) {
          localPaths.push("file://" + this.cacheIndex[remotePath]);
          onProgress?.(i + 1, imagePaths.length);
          continue;
        }
      }

      // Download
      const fileName = remotePath.replace(/\//g, "_");
      const localPath = CACHE_DIR + "/" + fileName;
      const url = `${BASE_URL}/${remotePath}`;

      try {
        await ReactNativeBlobUtil.config({
          path: localPath,
        }).fetch("GET", url);

        this.cacheIndex[remotePath] = localPath;
        localPaths.push("file://" + localPath);
      } catch (error) {
        console.error(`Failed to cache image: ${remotePath}`, error);
        // Fall back to remote URL
        localPaths.push(`${BASE_URL}/${remotePath}`);
      }

      onProgress?.(i + 1, imagePaths.length);
    }

    // Save updated cache index
    await AsyncStorage.setItem(CACHE_INDEX_KEY, JSON.stringify(this.cacheIndex));
    return localPaths;
  }

  // Clear all cached images
  async clearCache(): Promise<void> {
    try {
      const exists = await ReactNativeBlobUtil.fs.isDir(CACHE_DIR);
      if (exists) {
        await ReactNativeBlobUtil.fs.unlink(CACHE_DIR);
        await ReactNativeBlobUtil.fs.mkdir(CACHE_DIR);
      }
      this.cacheIndex = {};
      await AsyncStorage.removeItem(CACHE_INDEX_KEY);
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }

  // Get cache size in MB
  async getCacheSize(): Promise<number> {
    try {
      const exists = await ReactNativeBlobUtil.fs.isDir(CACHE_DIR);
      if (!exists) return 0;
      const files = await ReactNativeBlobUtil.fs.ls(CACHE_DIR);
      let totalSize = 0;
      for (const file of files) {
        const stat = await ReactNativeBlobUtil.fs.stat(CACHE_DIR + "/" + file);
        totalSize += stat.size;
      }
      return totalSize / (1024 * 1024); // Convert to MB
    } catch (error) {
      return 0;
    }
  }
}

export default new ImageCacheService();