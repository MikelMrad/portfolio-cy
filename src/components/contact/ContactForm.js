'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { t } from '@/content/i18n';

const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const configured = Boolean(SERVICE && TEMPLATE && PUBLIC_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SubmitButton = styled('button')(({ theme }) => {
  const c = theme.custom.colors;
  const m = theme.custom.motion;
  return {
    ...theme.custom.type.label,
    width: '100%',
    marginTop: 28,
    padding: '18px 20px',
    display: 'inline-flex',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: c.ink,
    color: c.snow,
    border: `1px solid ${c.ink}`,
    cursor: 'pointer',
    transition: `background-color ${m.durations.reduced}s ${m.ease}, color ${m.durations.reduced}s ${m.ease}`,
    '&:hover:not(:disabled)': { backgroundColor: c.paper, color: c.ink },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
    '&:focus-visible': { outline: `2px solid ${c.ink}`, outlineOffset: 4 },
  };
});

const Notice = styled('p', { shouldForwardProp: (p) => p !== 'variant' })(({ theme, variant }) => ({
  ...theme.custom.type.label,
  marginTop: 20,
  color: variant === 'error' ? theme.palette.error.main : theme.custom.colors.inkMuted,
}));

const fieldSx = (theme) => ({
  marginTop: 12,
  '& .MuiInputLabel-root': { ...theme.custom.type.label, color: theme.custom.colors.inkMuted },
  '& .MuiInputLabel-root.Mui-focused': { color: theme.custom.colors.ink },
  '& .MuiInput-root:before': { borderBottomColor: theme.custom.colors.lineLight },
  '& .MuiInput-root:hover:not(.Mui-disabled):before': { borderBottomColor: theme.custom.colors.inkMuted },
  '& .MuiInput-root:after': { borderBottomColor: theme.custom.colors.ink },
  '& .MuiInput-input': { ...theme.custom.type.body, paddingBlock: 10 },
});

export default function ContactForm() {
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
        { from_name: values.fullName, reply_to: values.email, message: values.message },
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
      <TextField
        fullWidth
        variant="standard"
        label={t('contact.fullName')}
        value={values.fullName}
        onChange={setField('fullName')}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName || ' '}
        disabled={disabled}
        autoComplete="name"
        slotProps={{ htmlInput: { autoCapitalize: 'words' } }}
        sx={fieldSx}
      />
      <TextField
        fullWidth
        type="email"
        variant="standard"
        label={t('contact.email')}
        value={values.email}
        onChange={setField('email')}
        error={Boolean(errors.email)}
        helperText={errors.email || ' '}
        disabled={disabled}
        autoComplete="email"
        slotProps={{ htmlInput: { inputMode: 'email', autoCapitalize: 'none', autoCorrect: 'off', spellCheck: false } }}
        sx={fieldSx}
      />
      <TextField
        fullWidth
        multiline
        minRows={4}
        variant="standard"
        label={t('contact.message')}
        value={values.message}
        onChange={setField('message')}
        error={Boolean(errors.message)}
        helperText={errors.message || ' '}
        disabled={disabled}
        sx={fieldSx}
      />

      {!configured ? <Notice>TODO: configure EmailJS env (NEXT_PUBLIC_EMAILJS_*) to enable sending.</Notice> : null}

      {done ? (
        <Notice role="status">{t('contact.success')}</Notice>
      ) : (
        <SubmitButton type="submit" disabled={disabled}>
          {busy ? t('contact.sending') : t('contact.send')}
          {!busy ? <span aria-hidden="true">↗</span> : null}
        </SubmitButton>
      )}

      {status === 'error' ? (
        <Notice role="alert" variant="error">
          {t('contact.error')}
        </Notice>
      ) : null}
    </form>
  );
}
