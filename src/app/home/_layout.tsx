import { Tabs } from "expo-router"
import { BookIcon, ClassIcon, HomeIcon, UserIcon, VideoIcon } from "../../../assets/svg"
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const TabsLayout = () => {
    const router = useRouter();
    return (
    
        
          <Tabs >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <HomeIcon />
                    )
                }} />
            <Tabs.Screen
                name="notes"
                options={{
                    title: "Notes",
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <BookIcon />
                    )
                }} />
            <Tabs.Screen
                name="edu"
                options={{
                    title: "Edu",
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <VideoIcon />
                    )
                }} />
            <Tabs.Screen
                name="classes"
                options={{
                    title: "Notifications", 
                    headerTitleAlign: "center", 
                    headerShown: true,
                    headerLeft: () => (
                        <MaterialIcons
                          name="arrow-back-ios"
                          size={24}
                          color="black"
                          style={{ marginLeft: 10 }}
                          onPress={() => router.back()} 
                        />
                      ),
                    tabBarIcon: ({ size, color }) => (
                        <ClassIcon />
                    )
                }} />
            <Tabs.Screen
                name="more"
                options={{
                    title: "More",
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <UserIcon />
                    )
                }} />

        </Tabs>
 
       
    )
}

export default TabsLayout