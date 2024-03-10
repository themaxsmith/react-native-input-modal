import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { ModalProvider, useModal } from 'react-native-input-modal';
export default function App() {
  return (
    <ModalProvider>
      <TestComponent />
    </ModalProvider>
  );
}

export function TestComponent() {
  const [result, setResult] = React.useState<number | undefined>();
  const [result2, setResult2] = React.useState<string | undefined>();
  const [result3, setResult3] = React.useState<string | undefined>();
  const { getTextInput, getSelectOption, getPickOption } = useModal();
  return (
    <View style={styles.container}>
      <Button
        title="Show Text Input Modal (Number)"
        onPress={async () => {
          const value = await getTextInput({
            title: 'Enter any value',
            placeholder: 'Enter any value',
          });
          setResult(Number(value));
        }}
      />
      <Text>Result: {result}</Text>

      <Button
        title="Show Select Modal"
        onPress={async () => {
          const value = await getSelectOption({
            title: 'Select a value',
            selected: result2,
            options: [
              { label: 'Some Option 1', value: '1' },
              { label: 'Some Option 2', value: '2' },
              { label: 'Some Option 3', value: '3' },
            ],
          });
          setResult2(value as string);
        }}
      />
      <Text>Result: {result2}</Text>
      <Button
        title="Show Pick Modal"
        onPress={async () => {
          const value = await getPickOption({
            title: 'Select a value',
            options: [
              { label: 'Some Option 1', value: '1' },
              { label: 'Some Option 2', value: '2' },
              { label: 'Some Option 3', value: '3' },
            ],
          });
          setResult3(value as string);
        }}
      />
      <Text>Result: {result3}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
