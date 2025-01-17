import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { InfoTriangle } from '../../../assets/svg';
import TouchableOutside from './TouchableOutside';

const { width, height } = Dimensions.get('window');

interface ConfirmModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  courses: { course: string; unit: string; grade: string }[];
  setTotalCGPA: (value: number) => void;
  initialCourses: { course: string; unit: string; grade: string }[];
  totalCGPA: number;
  setCourses: (courses: { course: string; unit: string; grade: string }[]) => void;
}

const ConfirmModal = ({ setModal, modal, courses, setTotalCGPA, initialCourses, totalCGPA, setCourses }: ConfirmModalProps) => {
  const calculateCGPA = () => {
    let totalUnits = 0;
    let totalPoints = 0;
    courses.forEach(course => {
      if (course.unit && course.grade) {
        const unit = parseFloat(course.unit);
        const grade = course.grade;
        let gradePoint = 0;
        switch (grade) {
          case 'A':
            gradePoint = 5;
            break;
          case 'B':
            gradePoint = 4;
            break;
          case 'C':
            gradePoint = 3;
            break;
          case 'D':
            gradePoint = 2;
            break;
          case 'E':
            gradePoint = 1;
            break;
          default:
            gradePoint = 0;
            break;
        }
        totalUnits += unit;
        totalPoints += unit * gradePoint;
      }
    });
    const calculatedCGPA = totalPoints / totalUnits;
    if (isNaN(calculatedCGPA)) {
      return 0;
    }
    if (totalCGPA !== 0) {
      const newCGPA = ((totalCGPA + calculatedCGPA) / 2).toFixed(2);
      return parseFloat(newCGPA);
    }
    return parseFloat(calculatedCGPA.toFixed(2));
  };

  const handleConfirm = () => {
    const calculatedCgpa = calculateCGPA();
    setTotalCGPA(calculatedCgpa);
    setCourses(initialCourses);
    setModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => setModal(!modal)}
    >
      <TouchableOutside onPress={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={styles.roundedContainer}>
                <InfoTriangle />
              </View>
            </View>
            <Text style={styles.firstText}>Confirm</Text>
            <Text style={styles.secondText}>Are you done adding all the courses?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, gap: 8 }}>
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Yes </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#1A1A1A' }]} onPress={() => setModal(false)}>
                <Text style={[styles.buttonText, { color: '#000000' }]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOutside>
    </Modal>
  );
};

const styles = StyleSheet.create({

    roundedContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: "#FBEAE9",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: "45%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#E53935",
        paddingVertical: 15,
        marginTop: 20,
      

    }
    ,
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF"
    },

    modalContent: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 20,
        alignItems: "center",
        height: height * 0.35,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        paddingTop: 10,
    },
    firstText: {
        fontSize: 14,
        fontWeight: "700",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 10,
        textAlign: "center"
    },
    secondText: {
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        color: "#000000",
        marginTop: 10,
        textAlign: "center"

    },
    thirdText: {
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        color: "#FFFFFF",
    },

})


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        color: '#000000',
        paddingRight: 30,
        alignSelf: 'stretch',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        color: '#000000',
        paddingRight: 30,
        alignSelf: 'stretch',
    },
    iconContainer: {
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default ConfirmModal
