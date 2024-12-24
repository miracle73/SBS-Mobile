import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SecondPadlockIcon } from '../../assets/svg';
import { useRouter } from 'expo-router';
import SubscriptionModal from './modals/SubscriptionModal';
import * as Device from 'expo-device';
import { useGetTopicContentMutation } from '../components/services/userService';
import Toast from 'react-native-toast-message';


interface TopicComponentProps {
    title: string;
    id: number;
    free: boolean
}


const TopicComponent: React.FC<TopicComponentProps> = ({ title, id, free }) => {
    const router = useRouter();
    const [modal, setModal] = React.useState(false);
    const [getTopicContent, { data, error, isLoading }] = useGetTopicContentMutation();

    const handlePress = async () => {
        // /admin/adminhome/first/birthdays
        // /admin/addNotification
        console.log(1)
        if (!free) {
            setModal(true)
            return;
        }
        console.log(2)
        try {
            console.log(3);
            const result = await getTopicContent({ phone_imei: Device.osBuildId, topic_id: id }).unwrap();
            console.log(4);
            // If successful, navigate to the note page with topic content
            router.push({
                pathname: '/other/note',
                params: { content: JSON.stringify(result.topic_content) },
            });
            console.log(5);
        } catch (error) {
            console.log(6);
            console.error('Error fetching topic content:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.data?.detail?.message || 'Failed to fetch topic content.',
            });
            return;
            console.log(7);
        }

    };
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
                styles.Container,
                { backgroundColor: '#F8F8F8', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 20, marginBottom: 10 },
            ]}
        >

            <View>
                <Text style={styles.firstText}>{title}</Text>

                {/* <Text style={styles.secondText}>Topic {topics}</Text> */}

            </View>
            {!free && <SecondPadlockIcon />}

            {modal && <SubscriptionModal setModal={setModal} modal={modal} />}
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    RoundedContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    firstText: {
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        color: '#000000',
        marginBottom: 5
    },
    secondText: {
        fontSize: 10,
        fontWeight: '400',
        fontStyle: 'normal',
        color: '#000000',
    },
});

export default TopicComponent