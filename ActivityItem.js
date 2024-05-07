import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import { Alert, StyleSheet} from 'react-native';

export default function ActivityItem({id, idx ,title, updated}) {
   const showToast = (message) => {
          Alert.alert("Thông tin hoạt động",message, cancelable=false)
        };
  async function deleteItem() {
   await Alert.alert(
     "Thông báo",
      'Bạn có muốn xoá công việc này',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
           firestore().collection('Jobs').doc(id).delete()}
        },
      ],
      { cancelable: false }
    );
   
  }
  var styles = StyleSheet.create({
    itemStyle:{
      borderRadius: 12, 
      backgroundColor: 'lightblue',
      marginTop: 5,
      padding:10,
    },
  })
  return (
    <List.Item
      title = {idx + '. ' + title}
      style={styles.itemStyle}
      onPress={()=>{showToast(title +" "+updated); return}}
      onLongPress={()=> deleteItem()}
      description={updated}
    />
  );
  
}
