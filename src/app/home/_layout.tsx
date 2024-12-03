import { Tabs } from "expo-router"
import { BookIcon, ClassIcon, HomeIcon, UserIcon, VideoIcon } from "../../../assets/svg"
import { StatusBar } from 'expo-status-bar';

const TabsLayout = () => {
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
                    title: "Classes",
                    headerShown: false,
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