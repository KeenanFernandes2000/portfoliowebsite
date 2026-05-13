"use client";

import * as React from "react";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface ContactFormStore extends ContactFormState {
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setMessage: (v: string) => void;
  fillAll: (values: ContactFormState) => void;
  focusForm: () => void;
  registerNameInputRef: (el: HTMLInputElement | null) => void;
}

const ContactFormContext = React.createContext<ContactFormStore | null>(null);

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [name, setNameState] = React.useState("");
  const [email, setEmailState] = React.useState("");
  const [message, setMessageState] = React.useState("");
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);

  const setName = React.useCallback((v: string) => setNameState(v), []);
  const setEmail = React.useCallback((v: string) => setEmailState(v), []);
  const setMessage = React.useCallback((v: string) => setMessageState(v), []);

  const fillAll = React.useCallback((values: ContactFormState) => {
    setNameState(values.name);
    setEmailState(values.email);
    setMessageState(values.message);
  }, []);

  const focusForm = React.useCallback(() => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Delay focus slightly so scroll can start
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 400);
  }, []);

  const registerNameInputRef = React.useCallback(
    (el: HTMLInputElement | null) => {
      nameInputRef.current = el;
    },
    []
  );

  const value = React.useMemo<ContactFormStore>(
    () => ({
      name,
      email,
      message,
      setName,
      setEmail,
      setMessage,
      fillAll,
      focusForm,
      registerNameInputRef,
    }),
    [name, email, message, setName, setEmail, setMessage, fillAll, focusForm, registerNameInputRef]
  );

  return (
    <ContactFormContext.Provider value={value}>
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactFormStore(): ContactFormStore {
  const ctx = React.useContext(ContactFormContext);
  if (!ctx) {
    throw new Error("useContactFormStore must be used within ContactFormProvider");
  }
  return ctx;
}
