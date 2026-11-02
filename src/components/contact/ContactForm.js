'use client';
import { useId, useState } from 'react';
import emailjs from '@emailjs/browser';
import { styled } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import { t } from '@/content/i18n';

const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const configured = Boolean(SERVICE && TEMPLATE && PUBLIC_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FieldWrap = styled('div')({ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 20 });

const Label = styled('label')(({ theme }) => ({
  ...theme.custom.type.label,
  fontWeight: 600,
  color: theme.custom.colors.label,
}));

// Rounded, filled text field. Error state via aria-invalid.
const inputStyles = (theme) => {
  const c = theme.custom.colors;
  return {
    ...theme.custom.type.body,
    width: '100%',
    minHeight: 48,
    padding: '12px 16px',
    borderRadius: theme.custom.radius.control,
    border: `1px solid ${c.separator}`,
    backgroundColor: c.tile,
    color: c.label,
    transition: `border-color ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
    '&::placeholder': { color: c.label2 },
    '&:hover:not(:disabled)': { borderColor: c.label2 },
    '&:focus-visible': { outline: `2px solid ${c.label}`, outlineOffset: 1, borderColor: 'transparent' },
    '&[aria-invalid="true"]': { borderColor: c.danger },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  };
};
const Input = styled('input')(({ theme }) => inputStyles(theme));
const TextArea = styled('textarea')(({ theme }) => ({ ...inputStyles(theme), resize: 'vertical', minHeight: 140 }));

const ErrorText = styled('p')(({ theme }) => ({ ...theme.custom.type.label, color: theme.custom.colors.danger, margin: 0 }));

const Notice = styled('p', { shouldForwardProp: (p) => p !== 'variant' })(({ theme, variant }) => ({
  ...theme.custom.type.label,
  marginTop: 20,
  marginBottom: 0,
  color: variant === 'error' ? theme.custom.colors.danger : theme.custom.colors.label2,
}));

function Field({ id, label, error, multiline, ...props }) {
  const errId = `${id}-error`;
  const Control = multiline ? TextArea : Input;
  return (
    <FieldWrap>
      <Label htmlFor={id}>{label}</Label>
      <Control id={id} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? errId : undefined} {...props} />
      {error ? <ErrorText id={errId}>{error}</ErrorText> : null}
    </FieldWrap>
  );
}

export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState({ fullName: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const setField = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.fullName.trim()) next.fullName = t('contact.required');
    if (!values.email.trim()) next.email = t('contact.required');
    else if (!EMAIL_RE.test(values.email)) next.email = t('contact.invalidEmail');
    if (!values.message.trim()) next.message = t('contact.required');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!configured || status === 'submitting') return;
    if (!validate()) return;
    setStatus('submitting');
    try {
      await emailjs.send(
        SERVICE,
        TEMPLATE,
        // Variable names match the EmailJS "Contact Us" template: {{name}}, {{email}}
        // (its Reply To), {{title}} (in the subject), {{time}} and {{message}}.
        {
          name: values.fullName,
          email: values.email,
          title: `new message from ${values.fullName}`,
          time: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Beirut', dateStyle: 'medium', timeStyle: 'short' }),
          message: values.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const busy = status === 'submitting';
  const done = status === 'success';
  const disabled = !configured || busy || done;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field
        id={`${uid}-name`}
        label={t('contact.fullName')}
        value={values.fullName}
        onChange={setField('fullName')}
        error={errors.fullName}
        disabled={disabled}
        autoComplete="name"
        autoCapitalize="words"
      />
      <Field
        id={`${uid}-email`}
        type="email"
        label={t('contact.email')}
        value={values.email}
        onChange={setField('email')}
        error={errors.email}
        disabled={disabled}
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <Field
        id={`${uid}-message`}
        multiline
        rows={5}
        label={t('contact.message')}
        value={values.message}
        onChange={setField('message')}
        error={errors.message}
        disabled={disabled}
      />

      {!configured ? <Notice>The contact form isn’t set up yet. Please reach out by email or phone.</Notice> : null}

      {done ? (
        <Notice role="status">{t('contact.success')}</Notice>
      ) : (
        <div style={{ marginTop: 28 }}>
          <Button type="submit" disabled={disabled} style={{ width: '100%' }}>
            {busy ? t('contact.sending') : t('contact.send')}
          </Button>
        </div>
      )}

      {status === 'error' ? (
        <Notice role="alert" variant="error">
          {t('contact.error')}
        </Notice>
      ) : null}
    </form>
  );
}
