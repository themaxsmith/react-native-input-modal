/* eslint-disable react-native/no-inline-styles */
/**
 * Copyright (c) Maxwell Smith and other maintainers
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// @ts-nocheck
import { createContext, useContext, useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
export type AwaitableComponentStatus =
  | 'idle'
  | 'awaiting'
  | 'resolved'
  | 'rejected';
type AwaitableComponentData = {
  status: AwaitableComponentStatus;
  resolve: ((value: unknown) => void) | null;
  reject: ((reason: any) => void) | null;
  args?: any;
};

export interface ModalSelectOption {
  label: string;
  value: string;
}

export interface ModalSelect {
  title: string;
  selectedValue?: string;
  options: ModalSelectOption[];
}

export interface ModalStyles {
  cancelBtnStyle?: any;
  cancelBtnTextStyle?: any;
  confirmBtnStyle?: any;
  confirmBtnTextStyle?: any;
  selectOptionStyle?: any;
  selectOptionSelectedStyle?: any;
  selectOptionTextStyle?: any;
  textInputStyle?: any;
  containerStyle?: any;
  modalStyle?: any;
  contentContainerStyle?: any;
  titleTextStyle?: any;
}

export function useAwaitableComponent() {
  const [data, setData] = useState<AwaitableComponentData>({
    status: 'idle',
    resolve: null,
    reject: null,
  });

  const handleResolve = (val: any) => {
    if (data.status !== 'awaiting')
      throw new Error('Awaitable component is not awaiting.');
    data.resolve?.(val);
    setData({ status: 'resolved', resolve: null, reject: null });
  };

  const handleReject = (err: any) => {
    if (data.status !== 'awaiting')
      throw new Error('Awaitable component is not awaiting.');
    data.reject?.(err);
    setData({ status: 'rejected', resolve: null, reject: null });
  };

  const handleReset = () => {
    setData({ status: 'idle', resolve: null, reject: null });
  };

  const handleExecute = async (args: any) => {
    return new Promise((resolve, reject) => {
      setData({ status: 'awaiting', resolve, reject, args });
    });
  };
  return [
    data.status,
    handleExecute,
    handleResolve,
    handleReject,
    handleReset,
    data.args,
  ] as const;
}

function ModalContainer({
  onSubmit,
  onCancel,
  args,
  ModalStyles,
}: Readonly<{
  onSubmit: (value: string) => void;
  onCancel: (val: any) => void;
  args: any;
  ModalStyles?: ModalStyles;
}>) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
  };

  const handleCancel = () => {
    onCancel(null);
  };
  const safeInserts = useSafeAreaInsets();
  return (
    <View style={ModalStyles?.modalStyle || styles.modal}>
      <TouchableWithoutFeedback
        onPress={() => {
          handleCancel();
        }}
        style={styles.toucableDismiss}
      >
        <View style={styles.toucableDismiss} />
      </TouchableWithoutFeedback>
      <View
        style={[
          {
            paddingBottom: safeInserts.bottom,
            paddingLeft: safeInserts.left,
            paddingLeft: safeInserts.right,
          },
          ModalStyles?.containerStyle || styles.contentContainer,
        ]}
      >
        <Text style={ModalStyles?.titleTextStyle || styles.titleText}>
          {args?.title}
        </Text>
        {args?.type === 'select' || args?.type === 'pick' ? (
          <ScrollView
            style={styles.contentScrollViewChildern || {}}
            contentContainerStyle={styles.contentScrollViewChildern}
          >
            {args?.options.map((option: ModalSelectOption, index: number) => {
              if (args?.type === 'select') {
                return (
                  <TouchableHighlight
                    onPress={() => {
                      onSubmit(option.value);
                    }}
                    key={option.value}
                    style={[
                      ModalStyles?.selectOptionStyle || styles.selectOption,
                      args?.selected === option.value
                        ? ModalStyles?.selectOptionSelectedStyle ||
                          styles.selectOptionSelected
                        : {},
                      index !== 0
                        ? { borderTopWidth: 1, borderTopColor: '#b6bbc2' }
                        : {},
                    ]}
                  >
                    <Text
                      style={
                        ModalStyles?.selectOptionTextStyle ||
                        styles.selectOptionText
                      }
                    >
                      {option.label}
                    </Text>
                  </TouchableHighlight>
                );
              }
              return (
                <TouchableHighlight
                  onPress={() => {
                    onSubmit(option.value);
                  }}
                  key={option.value}
                  style={
                    ModalStyles?.confirmBtnStyle || {
                      ...styles.button,
                      ...styles.buttonConfirm,
                    }
                  }
                >
                  {/* @ts-ignore */}
                  <Text style={styles.buttonText}>{option.label}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <TextInput
              style={ModalStyles?.textInputStyle || styles.buttonTextInput}
              placeholder={args?.placeholder}
              value={text}
              onChangeText={(value) => setText(value)}
            />
            <TouchableHighlight
              onPress={handleSubmit}
              style={
                ModalStyles?.confirmBtnStyle || {
                  ...styles.button,
                  ...styles.buttonConfirm,
                }
              }
            >
              <Text
                style={ModalStyles?.confirmBtnTextStyle || styles.buttonText}
              >
                Confirm
              </Text>
            </TouchableHighlight>
          </View>
        )}

        <TouchableHighlight
          onPress={handleCancel}
          style={
            ModalStyles?.cancelBtnStyle || {
              ...styles.button,
              ...styles.buttonCancel,
            }
          }
        >
          <Text style={ModalStyles?.cancelBtnTextStyle || styles.buttonText}>
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const ModalContext = createContext<{
  getTextInput: (args: {
    title: string;
    placeholder: string;
  }) => Promise<string | null>;
  getSelectOption: (args: {
    title: string;
    selected?: string;
    options: ModalSelectOption[];
  }) => Promise<string | null>;
  getPickOption: (args: {
    title: string;
    options: ModalSelectOption[];
  }) => Promise<string | null>;
}>({
  getTextInput: async () => null,
  getSelectOption: async () => null,
  getPickOption: async () => null,
});

const ModalProvider = ({
  children,
  ModalStyles,
}: {
  children: any;
  ModalStyles?: ModalStyles;
}) => {
  const [status, execute, resolve, reject, reset, args] =
    useAwaitableComponent();
  const showModal = status === 'awaiting';

  const fn = useMemo(() => {
    return {
      getTextInput: async ({
        title,
        placeholder,
      }: {
        title: string;
        placeholder: string;
      }): Promise<string | null> => {
        try {
          // @ts-ignore
          const value: string = await execute({
            title,
            placeholder,
            type: 'text',
          });
          return value;
        } catch (err) {
          return null;
        } finally {
          reset();
        }
      },
      getPickOption: async ({
        title,
        options,
      }: {
        title: string;
        options: ModalSelectOption[];
      }): Promise<string | null> => {
        try {
          // @ts-ignore
          const value: string = await execute({
            title,
            options,
            type: 'pick',
          });
          return value;
        } catch (err) {
          return null;
        } finally {
          reset();
        }
      },
      getSelectOption: async ({
        title,
        selected,
        options,
      }: {
        title: string;
        selected?: string;
        options: ModalSelectOption[];
      }): Promise<string | null> => {
        try {
          // @ts-ignore
          const value: string = await execute({
            title,
            selected,
            options,
            type: 'select',
          });
          return value;
        } catch (err) {
          return null;
        } finally {
          reset();
        }
      },

      // ...
    };
  }, [execute, reset]);

  return (
    <ModalContext.Provider value={fn}>
      {children}
      <Modal
        visible={showModal}
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
      >
        <SafeAreaProvider>
          <ModalContainer
            onSubmit={resolve}
            onCancel={reject}
            args={args}
            ModalStyles={ModalStyles}
          />
        </SafeAreaProvider>
      </Modal>
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// convert classNames to style objects
const styles = {
  modal: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0 ,0.5)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  toucableDismiss: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    maxHeight: '100%',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 15,
  },
  buttonConfirm: {
    backgroundColor: '#1c4391',
    marginTop: 10,
  },
  buttonCancel: {
    backgroundColor: '#3b3b3b',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonTextInput: {
    borderRadius: 15,
    padding: 15,
    marginTop: 10,

    backgroundColor: '#d6d6d6',
  },
  selectOption: {
    padding: 15,
  },
  selectOptionSelected: {
    backgroundColor: '#e8e8e8',
    fontWeight: 'bold',
  },
  selectOptionText: {
    color: 'black',
    textAlign: 'left',
  },
  // make scroll view flex full container height if needed
  contentScrollViewStyle: {
    flex: 1,
  },
  contentScrollViewChildern: {},
};

export { ModalProvider, useModal };
