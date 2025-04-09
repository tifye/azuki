import * as Haptics from 'expo-haptics'
import { useSchema } from '@/components/schema/hooks/schemaProvider'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useThemeColor } from '@/components/Themed'

export default function SettingsScreen() {
    const { source, loadSchema, setSource } = useSchema()
    const [input, setInput] = useState(source)
    const reloadBtnBgColor = useThemeColor({}, 'secondary')
    const reloadBtnContentColor = useThemeColor({}, 'secondaryContent')
    const shadowColor = useThemeColor({}, 'neutral')
    const primary = useThemeColor({}, 'primary')
    const base100 = useThemeColor({}, 'base100')
    const accent = useThemeColor({}, 'accent')
    function handleReloadPressed() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        setSource(input)
        loadSchema()
    }

    return (
        <View
            style={{
                gap: 36,
                padding: 36,
            }}
        >
            <TextInput
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleReloadPressed}
                selectionColor={accent}
                autoFocus
                submitBehavior="newline"
                style={{
                    backgroundColor: base100,
                    padding: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: primary,
                    color: primary,
                }}
            />
            <TouchableOpacity
                onPress={handleReloadPressed}
                style={{
                    backgroundColor: reloadBtnBgColor,
                    padding: 16,
                    borderRadius: 8,
                    shadowColor: shadowColor,
                    shadowOffset: {
                        width: -1,
                        height: 2,
                    },
                    shadowRadius: 2,
                    shadowOpacity: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 16,
                }}
            >
                <Text
                    style={{
                        color: reloadBtnContentColor,
                        textAlign: 'center',
                        fontSize: 18,
                    }}
                >
                    Reload schema
                </Text>
            </TouchableOpacity>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}
