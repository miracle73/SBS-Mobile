import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface GradeItem {
  label: string;
  value: string;
}

interface CustomGradePickerProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

const CustomGradePicker: React.FC<CustomGradePickerProps> = ({
  value,
  onValueChange,
  placeholder = "Grade",
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const gradeItems: GradeItem[] = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
  ];

  const handleSelect = (grade: GradeItem) => {
    onValueChange(grade.value);
    setIsOpen(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen(true)}>
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Grade</Text>

            {gradeItems.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.gradeOption,
                  value === item.value && styles.selectedGrade,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.gradeText,
                    value === item.value && styles.selectedGradeText,
                  ]}
                >
                  {item.label}
                </Text>
                {value === item.value && (
                  <MaterialIcons name="check" size={20} color="#FF8C00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    height: 50,
    width: "100%",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
  },
  placeholderText: {
    color: "#98A2B3",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 20,
    width: 200,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
  },
  gradeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedGrade: {
    backgroundColor: "#fff3e0",
  },
  gradeText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  selectedGradeText: {
    color: "#FF8C00",
  },
});

export default CustomGradePicker;
