import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-native/no-inline-styles */
/**
 * Copyright (c) Maxwell Smith and other maintainers
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// @ts-nocheck
import React, { useState, createContext, useContext, useMemo } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, Modal, } from 'react-native';
export function useAwaitableComponent() {
    const [data, setData] = useState({
        status: 'idle',
        resolve: null,
        reject: null,
    });
    const handleResolve = (val) => {
        if (data.status !== 'awaiting')
            throw new Error('Awaitable component is not awaiting.');
        data.resolve?.(val);
        setData({ status: 'resolved', resolve: null, reject: null });
    };
    const handleReject = (err) => {
        if (data.status !== 'awaiting')
            throw new Error('Awaitable component is not awaiting.');
        data.reject?.(err);
        setData({ status: 'rejected', resolve: null, reject: null });
    };
    const handleReset = () => {
        setData({ status: 'idle', resolve: null, reject: null });
    };
    const handleExecute = async (args) => {
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
    ];
}
function ModalContainer({ onSubmit, onCancel, args, ModalStyles, }) {
    const [text, setText] = useState('');
    const handleSubmit = () => {
        onSubmit(text);
        setText('');
    };
    const handleCancel = () => {
        onCancel(null);
    };
    return (_jsxs(View, { style: ModalStyles?.modalStyle || styles.modal, children: [_jsx(TouchableWithoutFeedback, { onPress: () => {
                    handleCancel();
                }, style: styles.toucableDismiss, children: _jsx(View, { style: styles.toucableDismiss }) }), _jsxs(View, { style: ModalStyles?.containerStyle || styles.contentContainer, children: [_jsx(Text, { style: ModalStyles?.titleTextStyle || styles.titleText, children: args?.title }), args?.type === 'select' || args?.type === 'pick' ? (_jsx(_Fragment, { children: args?.options.map((option, index) => {
                            if (args?.type === 'select') {
                                return (_jsx(TouchableHighlight, { onPress: () => {
                                        onSubmit(option.value);
                                    }, style: [
                                        ModalStyles?.selectOptionStyle || styles.selectOption,
                                        args?.selected === option.value
                                            ? ModalStyles?.selectOptionSelectedStyle ||
                                                styles.selectOptionSelected
                                            : {},
                                        index !== 0
                                            ? { borderTopWidth: 1, borderTopColor: '#b6bbc2' }
                                            : {},
                                    ], children: _jsx(Text, { style: ModalStyles?.selectOptionTextStyle ||
                                            styles.selectOptionText, children: option.label }) }, option.value));
                            }
                            return (_jsx(TouchableHighlight, { onPress: () => {
                                    onSubmit(option.value);
                                }, style: ModalStyles?.confirmBtnStyle || {
                                    ...styles.button,
                                    ...styles.buttonConfirm,
                                }, children: _jsx(Text, { style: styles.buttonText, children: option.label }) }, option.value));
                        }) })) : (_jsxs(View, { children: [_jsx(TextInput, { style: ModalStyles?.textInputStyle || styles.buttonTextInput, placeholder: args?.placeholder, value: text, onChangeText: (value) => setText(value) }), _jsx(TouchableHighlight, { onPress: handleSubmit, style: ModalStyles?.confirmBtnStyle || {
                                    ...styles.button,
                                    ...styles.buttonConfirm,
                                }, children: _jsx(Text, { style: ModalStyles?.confirmBtnTextStyle || styles.buttonText, children: "Confirm" }) })] })), _jsx(TouchableHighlight, { onPress: handleCancel, style: ModalStyles?.cancelBtnStyle || {
                            ...styles.button,
                            ...styles.buttonCancel,
                        }, children: _jsx(Text, { style: ModalStyles?.cancelBtnTextStyle || styles.buttonText, children: "Cancel" }) })] })] }));
}
const ModalContext = createContext({
    getTextInput: async () => null,
    getSelectOption: async () => null,
    getPickOption: async () => null,
});
const ModalProvider = ({ children, ModalStyles, }) => {
    const [status, execute, resolve, reject, reset, args] = useAwaitableComponent();
    const showModal = status === 'awaiting';
    const fn = useMemo(() => {
        return {
            getTextInput: async ({ title, placeholder, }) => {
                try {
                    // @ts-ignore
                    const value = await execute({
                        title,
                        placeholder,
                        type: 'text',
                    });
                    return value;
                }
                catch (err) {
                    return null;
                }
                finally {
                    reset();
                }
            },
            getPickOption: async ({ title, options, }) => {
                try {
                    // @ts-ignore
                    const value = await execute({
                        title,
                        options,
                        type: 'pick',
                    });
                    return value;
                }
                catch (err) {
                    return null;
                }
                finally {
                    reset();
                }
            },
            getSelectOption: async ({ title, selected, options, }) => {
                try {
                    // @ts-ignore
                    const value = await execute({
                        title,
                        selected,
                        options,
                        type: 'select',
                    });
                    return value;
                }
                catch (err) {
                    return null;
                }
                finally {
                    reset();
                }
            },
            // ...
        };
    }, [execute, reset]);
    return (_jsxs(ModalContext.Provider, { value: fn, children: [children, _jsx(Modal, { visible: showModal, transparent: true, supportedOrientations: ['portrait', 'landscape'], children: _jsx(ModalContainer, { onSubmit: resolve, onCancel: reject, args: args, ModalStyles: ModalStyles }) })] }));
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
};
export { ModalProvider, useModal };
