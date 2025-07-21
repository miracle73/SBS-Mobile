import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

interface DropdownItem {
  label: string;
  value: string;
}

interface CustomScrollableDropdownProps {
  items: DropdownItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  maxHeight?: number;
  style?: ViewStyle;
}

const CustomScrollableDropdown: React.FC<CustomScrollableDropdownProps> = ({
  items,
  value,
  onValueChange,
  placeholder = "Select an option",
  searchable = false,
  searchPlaceholder = "Search...",
  maxHeight = 300,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredItems = searchable
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : items;

  const selectedItem = items.find((item) => item.value === value);

  interface HandleSelectItem {
    label: string;
    value: string;
  }

  const handleSelect = (item: HandleSelectItem): void => {
    onValueChange(item.value);
    setIsOpen(false);
    setSearchText("");
  };

  const renderItem = ({ item }: { item: DropdownItem }) => (
    <TouchableOpacity
      style={[styles.listItem, value === item.value && styles.selectedItem]}
      onPress={() => handleSelect(item)}
    >
      <Text
        style={[
          styles.listItemText,
          value === item.value && styles.selectedItemText,
        ]}
      >
        {item.label}
      </Text>
      {value === item.value && (
        <MaterialIcons name="check" size={20} color="#FF8C00" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={style}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen(true)}>
        <Text
          style={[styles.dropdownText, !selectedItem && styles.placeholderText]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#666"
        />
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
          <View style={[styles.modalContent, { maxHeight }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Course</Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View style={styles.searchContainer}>
                <MaterialIcons
                  name="search"
                  size={20}
                  color="#666"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus={false}
                />
              </View>
            )}

            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              style={styles.list}
              showsVerticalScrollIndicator={true}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
    borderColor: "#B0BEC5",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  placeholderText: {
    color: "#999",
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
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  list: {
    maxHeight: 400,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedItem: {
    backgroundColor: "#fff3e0",
  },
  listItemText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  selectedItemText: {
    color: "#FF8C00",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
  },
});

export default CustomScrollableDropdown;
