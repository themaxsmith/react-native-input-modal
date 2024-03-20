# react-native-input-modal

An easy-to-use pure JavaScript React Native Input/Dialog Modal

Fully customizable Model using async-await imperative logic. Compatible with all platforms (iOS, Android, Web).

- [x] Supports Text Input
- [x] Supports Option Picker
- [x] Supports Button Select

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

<img width="400" alt="Screenshot 2024-03-19 at 4 57 13 PM" src="https://github.com/themaxsmith/react-native-input-modal/assets/19381797/cbe7e263-12b5-413e-8e5b-a817227a9c21">



```js
import { useModal } from 'react-native-input-modal';

// ... Some function in any component

const { getTextInput } = useModal();

const value = await getTextInput({
  title: 'Enter any value',
  placeholder: 'Enter any value',
});

// ... returns: null or the value entered

console.log('Result:', result);
```
Get Options (Select):

<img width="400" alt="Screenshot 2024-03-19 at 4 57 25 PM" src="https://github.com/themaxsmith/react-native-input-modal/assets/19381797/b46e7bad-7d5e-4ad7-9cfb-6b280062a769">


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

Get Options (Button):

<img width="400" alt="Screenshot 2024-03-19 at 4 57 35 PM" src="https://github.com/themaxsmith/react-native-input-modal/assets/19381797/94d8ac6c-2b1d-4927-bb69-f4f60c94c593">


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

## Usage (Advance)

The UI is fully customizable by passing a ModalStyles object to the ModalProvider. You can style any button or component of the UI

## Roadmap

- [ ] Date/Time Picker
- [ ] Custom Components
- [ ] Add examples to custom styles
- [ ] Add multiple pre-built themes
      
## Contributing

Feel free to contribute to this project by creating issues or pull requests. This is my first open-source project, so I'm open to any suggestions or help.

## License

MIT

---
