import React, { useEffect } from "react";
import { Modal, ModalProps } from "react-native";
import * as ScreenCapture from "expo-screen-capture";

interface SecureModalProps extends ModalProps {
  children: React.ReactNode;
  onSecurityViolation?: () => void;
}

export const SecureModalWrapper: React.FC<SecureModalProps> = ({
  children,
  visible,
  onSecurityViolation,
  ...modalProps
}) => {
  useEffect(() => {
    if (visible) {
      // Re-enable protection when modal opens
      ScreenCapture.preventScreenCaptureAsync().catch(console.error);
    }
  }, [visible]);

  return (
    <Modal visible={visible} {...modalProps}>
      {children}
    </Modal>
  );
};

// components/SecurePDFViewer.tsx
