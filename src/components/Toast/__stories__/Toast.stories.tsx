import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { Toast, ToastProps } from '../Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
};

export default meta;

const render = (props: ToastProps) => {
  return (
    <Toast
      id={props.id}
      onClose={function (): void {}}
      message={props.message}
      title={props.title}
      name={props.name}
      Id={props.Id}
      type={props.type}
      toastType={props.toastType}
      open={true}
    ></Toast>
  );
};

export const SuccessWithCTA = {
  render: (args: ToastProps) => {
    return <>{render(args)}</>;
  },

  args: {
    id: '1',
    title: 'Something went wrong',
    message: 'Please resend the appointment alert sms/email ',
    name: 'Emily Blunt',
    Id: 1,
    toastType: 'withCTA',
    type: 'success',
    onClick: action('clicked'),
    children: 'No Children',
  },
};
export const WarningWithCTA = {
  render: (args: ToastProps) => {
    return <>{render(args)}</>;
  },

  args: {
    id: '2',
    title: 'Something went wrong',
    message: 'Please resend the appointment alert sms/email ',
    name: 'Emily Blunt',
    Id: 1,
    toastType: 'withCTA',
    type: 'warning',
    onClick: action('clicked'),
    children: 'No Children',
  },
};

export const ErrorWithCTA = {
  render: (args: ToastProps) => {
    return <>{render(args)}</>;
  },

  args: {
    id: '3',
    title: 'Something went wrong',
    message: 'Please resend the appointment alert sms/email ',
    toastType: 'withCTA',
    type: 'error',
    onClick: action('clicked'),
    children: 'No Children',
  },
};
export const Success = {
  render: (args: ToastProps) => {
    return <>{render(args)}</>;
  },

  args: {
    id: '1',
    title: 'Something went wrong',
    message: 'Please resend the appointment alert sms/email ',
    name: 'Emily Blunt',
    Id: 1,
    toastType: ' ',
    type: 'success',
    onClick: action('clicked'),
    children: 'No Children',
  },
};
export const Warning = {
  render: (args: ToastProps) => {
    return <>{render(args)}</>;
  },

  args: {
    id: '2',
    title: 'Something went wrong',
    message: 'Please resend the appointment alert sms/email ',
    name: 'Emily Blunt',
    Id: 1,
    toastType: ' ',
    type: 'warning',
    onClick: action('clicked'),
    children: 'No Children',
  },
};

export const Error = {
  render: (args: ToastProps) => {
    return <>{render(args)}</>;
  },

  args: {
    id: '3',
    title: 'Something went wrong',
    message: 'Please resend the appointment alert sms/email ',
    toastType: ' ',
    type: 'error',
    onClick: action('clicked'),
    children: 'No Children',
  },
};
