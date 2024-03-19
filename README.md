# react-native-input-modal

An easy-to-use pure JavaScript React Native Input/Dialog Modal

Fully customizable Model using async-await imperative logic. Compatible with all platforms (iOS, Android, Web).

[x] Supports Text Input
[x] Supports Option Picker
[x] Supports Button Select

### Roadmap

[ ] Date/Time Picker
[ ] Custom Components

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
<img width="2559" alt="Screenshot 2024-03-09 at 4 11 37 PM" src="https://github.com/themaxsmith/react-native-input-modal/assets/19381797/559aae85-4851-40b0-8f32-38da28dce2b9">

```js
import { useModal } from 'react-native-input-modal';

// ... Some function in any component

const { getTextInput } = useModal();

const value = await getTextInput({
  title: 'Enter any value',
  placeholder: 'Enter any value',
});

// ... ether null or the value entered

console.log('Result:', result);
```

Get Options (Button):
<img width="2559" alt="Screenshot 2024-03-09 at 4 11 19 PM" src="https://github.com/themaxsmith/react-native-input-modal/assets/19381797/e40dd428-f1d2-432b-b644-0c0a2173d278">

```js
import { useModal } from 'react-native-input-modal';

const { getPickOption } = useModal();

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
<img width="2557" alt="Screenshot 2024-03-09 at 4 11 29 PM" src="https://github.com/themaxsmith/react-native-input-modal/assets/19381797/6cead7c8-d10b-4514-9244-0679ddce6633">

```js
import { useModal } from 'react-native-input-modal';

const { getSelectOption } = useModal();

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

## Usage (Advance)

The UI is fully customizable by passing a ModalStyles object to the ModalProvider. You can style any button or component of the UI

## Contributing

Feel free to contribute to this project by creating issues or pull requests. This is my first open-source project, so I'm open to any suggestions or help.

## License

MIT

---
