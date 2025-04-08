import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useThemeColor } from '@/components/Themed';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const headerBgColor = useThemeColor({}, "base100")
    const bodyBgColor = useThemeColor({}, "base200")
    const baseContent = useThemeColor({}, "baseContent")
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                headerStyle: { backgroundColor: headerBgColor },
                headerTitleStyle: { color: baseContent },
                tabBarStyle: { backgroundColor: headerBgColor },
                tabBarLabelStyle: { color: baseContent },
                tabBarIconStyle: { color: baseContent },
                sceneStyle: { backgroundColor: bodyBgColor }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={baseContent} />,
                    headerRight: headerRight,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Nothing',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={baseContent} />,
                }}
            />
        </Tabs>
    );
}

function headerRight() {
    const colorScheme = useColorScheme();

    return (
        <Link href="/settings" asChild>
            <Pressable>
                {({ pressed }) => (
                    <FontAwesome
                        name="gear"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].baseContent}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                )}
            </Pressable>
        </Link>
    )
}