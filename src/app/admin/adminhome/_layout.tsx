import { Tabs } from "expo-router"
import { BookIcon, ClassIcon, HomeIcon, UserIcon, VideoIcon } from "../../../../assets/svg"
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const AdminTabsLayout = () => {
    const router = useRouter();
    return (


        <Tabs >
            <Tabs.Screen
                name="first"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <HomeIcon />
                    )
                }} />

            <Tabs.Screen
                name="upload"
                options={{
                    title: "Uploads",
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <BookIcon />
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

export default AdminTabsLayout