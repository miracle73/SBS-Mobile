import { Tabs } from "expo-router"
import { BookIcon, ClassIcon, HomeIcon, UserIcon, VideoIcon } from "../../../assets/svg"
import { StatusBar } from 'expo-status-bar';

const TabsLayout = () => {
    return (
        <>
        
          <Tabs >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ size, color }) => (
                        <HomeIcon />
                    )
                }} />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Notes",
                    tabBarIcon: ({ size, color }) => (
                        <BookIcon />
                    )
                }} />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Edu",
                    tabBarIcon: ({ size, color }) => (
                        <VideoIcon />
                    )
                }} />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Classes",
                    tabBarIcon: ({ size, color }) => (
                        <ClassIcon />
                    )
                }} />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "More",
                    tabBarIcon: ({ size, color }) => (
                        <UserIcon />
                    )
                }} />

        </Tabs>
        </>
       
    )
}

export default TabsLayout