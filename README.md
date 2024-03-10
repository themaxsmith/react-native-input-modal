# react-native-input-modal

An easy-to-use pure JavaScript React Native Input/Dialog Modal

## Installation

```sh
npm install react-native-input-modal
yarn add react-native-input-modal
```

## Basic Usage

In your App.js file, import the ModalProvider and wrap your app with it. Then you can call async functions to show the modal and get the result.

```js
import { ModalProvider } from 'react-native-input-modal';

// ...

<ModalProvider>
  <App />
</ModalProvider>;
```

In your component, you can call the async function to show the modal and get the result.

Text Input:

```js
import { useModal } from 'react-native-input-modal';

// ...

const { getTextInput } = useModal();

const value = await getTextInput({
  title: 'Enter any value',
  placeholder: 'Enter any value',
});

console.log('Result:', result);
```

Get Options (Button):

```js
import { useModal } from 'react-native-input-modal';

const value = await getPickOption({
  title: 'Select a value',
  options: [
    { label: 'Some Option 1', value: '1' },
    { label: 'Some Option 2', value: '2' },
    { label: 'Some Option 3', value: '3' },
  ],
});
```

Get Options (Select):

```js
import { useModal } from 'react-native-input-modal';

const value = await getSelectOption({
  title: 'Select a value',
  selected: '1', // Optional
  options: [
    { label: 'Some Option 1', value: '1' },
    { label: 'Some Option 2', value: '2' },
    { label: 'Some Option 3', value: '3' },
  ],
});
```

## Contributing

Feel free to contribute to this project by creating issues or pull requests. This is my first open-source project, so I'm open to any suggestions or help.

## License

MIT

---
