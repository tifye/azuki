import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '@/components/useColorScheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useThemeColor } from '@/components/Themed'
import { SchemaContextProvider } from '@/components/schema/hooks/schemaProvider'

const queryClient = new QueryClient()

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return <RootLayoutNav />
}

function RootLayoutNav() {
    const colorScheme = useColorScheme()
    const bodyBg = useThemeColor({}, 'base200')
    const headerBg = useThemeColor({}, 'base100')
    const headerContentColor = useThemeColor({}, 'baseContent')

    return (
        <QueryClientProvider client={queryClient}>
            <SchemaContextProvider initialSource="http://192.168.18.175:8484/schema">
                <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                                contentStyle: { backgroundColor: bodyBg },
                                headerStyle: { backgroundColor: headerBg },
                                headerTitleStyle: { color: headerContentColor },
                            }}
                        />
                        <Stack.Screen
                            name="settings"
                            options={{
                                presentation: 'modal',
                                contentStyle: { backgroundColor: bodyBg },
                                headerStyle: { backgroundColor: headerBg },
                                headerTitleStyle: { color: headerContentColor },
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </SchemaContextProvider>
        </QueryClientProvider>
    )
}
