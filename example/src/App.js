import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { ModalProvider, useModal } from 'react-native-input-modal';

export default function App() {
  return (_jsx(ModalProvider, { children: _jsx(TestComponent, {}) }));
}
export function TestComponent() {
  const [result, setResult] = React.useState();
  const [result2, setResult2] = React.useState();
  const [result3, setResult3] = React.useState();
  const { getTextInput, getSelectOption, getPickOption } = useModal();
  return (_jsxs(View, {
    style: styles.container,
    children: [_jsx(Button, {
      title: 'Show Text Input Modal (Number)',
      onPress: async () => {
        const value = await getTextInput({
          title: 'Enter any value',
          placeholder: 'Enter any value',
        });
        setResult(Number(value));
      },
    }), _jsxs(Text, { children: ['Result: ', result] }), _jsx(Button, {
      title: 'Show Select Modal',
      onPress: async () => {
        const value = await getSelectOption({
          title: 'Select a value',
          selected: result2,
          options: [
            { label: 'Some Option 1', value: '1' },
            { label: 'Some Option 2', value: '2' },
            { label: 'Some Option 3', value: '3' },
          ],
        });
        setResult2(value);
      },
    }), _jsxs(Text, { children: ['Result: ', result2] }), _jsx(Button, {
      title: 'Show Pick Modal',
      onPress: async () => {
        const value = await getPickOption({
          title: 'Select a value',
          options: [
            { label: 'Some Option 1', value: '1' },
            { label: 'Some Option 2', value: '2' },
            { label: 'Some Option 3', value: '3' },
          ],
        });
        setResult3(value);
      },
    }), _jsxs(Text, { children: ['Result: ', result3] })],
  }));
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
