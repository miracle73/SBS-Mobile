import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const cleanMarkdown = (markdown: any) => {
    return md.render(markdown);
}



const MarkdownLatexViewer = ({ content }: any) => {
  const [processedContent, setProcessedContent] = useState('');

  // Convert markdown to HTML
  const convertMarkdownToHtml = (text: any) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')           // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>')                       // Italic
      .replace(/`(.*?)`/g, '<code>$1</code>')                     // Inline code
      .replace(/^\* (.+)/gm, '<li>$1</li>')                       // Unordered lists
      .replace(/^- /gm, '')                                       // Remove list item markers
      .replace(/\n/g, '<br>')                                     // Preserve line breaks
      .replace(/^(#+) (.+)/gm, (match: any, hashes: any, text: any) => {
        const level = hashes.length;
        return `<h${level}>${text}</h${level}>`;
      });                                                        // Headers
  };

  // Process content when it changes
  React.useEffect(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
          </script>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            strong { font-weight: bold; }
            em { font-style: italic; }
            code { background-color: #f0f0f0; padding: 2px 4px; border-radius: 4px; }
            h1, h2, h3, h4, h5, h6 { color: #333; }
            li { margin: 8px 0; }
            
          </style>
        </head>
        <body>
    
             ${cleanMarkdown(content)}
        </body>
      </html>
    `;
    
    setProcessedContent(htmlContent);
  }, [content]);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: processedContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebKit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    minHeight: 600,
  },
});

export default MarkdownLatexViewer;