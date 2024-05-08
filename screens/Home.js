import React, { useEffect } from "react";
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import { Alert, FlatList, View, Text, TouchableOpacity, TextInput } from "react-native";
import ActivityItem from "../ActivityItem";
import { logout, useMyContextProvider } from "../store/Index";

export default function Home({navigation}) {
  const[loading, setLoading] = React.useState(true)
  const[activities,setActivities] = React.useState([])
  const[activity,setActivity] = React.useState('')
  const ref = firestore().collection('Jobs')
  const [controller, dispatch] = useMyContextProvider();
  const {userLogin} = controller
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: null,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight:10 }}>
            <Text style={{ marginRight: 2, fontStyle:'italic', fontWeight:'bold', color:'white' }}>{(userLogin!=null?userLogin.fullName:"error")}</Text>
            <Text style={{color:'white'}} onPress={() =>  logout(dispatch, navigation)}>, thoát</Text>
          </View> 
        ),
      });
    }, [navigation, userLogin]);
    async function addActivity(){
      if(activity != '')
      {
        await ref.add({
          title:activity,
          updated: new Date().toLocaleString()
        });
      }else{
        Alert.alert("Thông báo",'Chưa nhập tên hoạt động')
      }
     
      setActivity('');
    }
  
    React.useEffect(()=>{
      return ref.orderBy('updated', 'asc').onSnapshot(querySnapshot => {
        const list = []
        querySnapshot.forEach(doc=>{
          const {title, updated} = doc.data()
          list.push({
            id: doc.id,
            title,
            updated,
          })
        })
      
        setActivities(list)
        if (loading) {
          setLoading(false)
        }
      })
    })
    if (loading){
      return null
    }
    return(
      <View style = {{flex:1, backgroundColor:'mintcream'}}>
        <View style={{flexDirection:'row', marginTop:20, alignSelf:'center'}}>
          <TextInput style={{width:300, borderRadius: 5,backgroundColor:'azure', borderColor:'gray',borderWidth:1,padding:5}} label={'Hoạt động mới'} 
               value = {activity}
               placeholder="Hoạt động mới"
               onChangeText = {(text) =>{
               setActivity(text)
               }
          } />
       <TouchableOpacity
          style={{ width: 75, height: 50,marginLeft:10 ,backgroundColor: 'royalblue', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
          onPress={addActivity}>
          <Text style={{ color: 'white', fontWeight:'bold' }}>THÊM</Text>
        </TouchableOpacity>
        </View>
        <Text style={{fontWeight:'bold',marginTop:20, marginBottom:10, fontSize:16, textAlign:'center'}}>DANH SÁCH HOẠT ĐỘNG</Text>
        <FlatList
          style = {{flex:1,margin:15}}
          data = {activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <ActivityItem {...item} idx={index} />}
        />
      </View>
    );
}

