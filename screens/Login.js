import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native"
import { Checkbox, HelperText} from "react-native-paper"
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMyContextProvider, login } from '../store/Index'; 
const Login = ({ navigation, route}) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [controller, dispatch] = useMyContextProvider();

    useEffect(() => {
      if (route.params && route.params.email) {
        setUserName(route.params.email);
        console.log(route.params.email)
      }
    }, [route.params]);
    const onPress = () => {
     
        if (!username || !password) {
          setError('Vui lòng nhập đầy đủ thông tin');
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(username)) {
          setError('Email không hợp lệ');
          return;
        }
        setError('');
        login(dispatch, username, password, navigation);
    }
    return (
      <View style={LoginStyle.container}>
        <Image resizeMode="stretch" style={{ width: 350, height: 250 }} source={require("../assets/logo.png")} />
        <Text
          onPress={() => {
            navigation.navigate('Register')
          }}
          style={{ alignSelf: "flex-end", marginRight: 18, fontStyle: "italic" }}>Đăng ký</Text>
        <TextInput
          onChangeText={setUserName}
          onEndEditing={username.length != 0?()=> setError(''):()=>setError('Vui lòng nhập đầy đủ thông tin')}
          style={LoginStyle.textInput}
          placeholder="Nhập tài khoản"
          value={username}
        />
        <TextInput
          onChangeText={setPassword}
          style={LoginStyle.textInput}
          onEndEditing={password.length != 0?()=> setError(''):()=>setError('Vui lòng nhập đầy đủ thông tin')}
          secureTextEntry={!showPassword}
          placeholder="Nhập mật khẩu"
          value={password}
        />
  
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginTop: 8, marginLeft: 8 }}>
          <Checkbox
            onPress={() => setShowPassword(!showPassword)}
            status={showPassword ? "checked" : "unchecked"}
            style={{ marginRight: 10, }}
          />
          <Text onPress={() => setShowPassword(!showPassword)}>Hiển thị mật khẩu</Text>
        </View>
  
        <HelperText type="error" visible={!!error}>{error}</HelperText>
        <TouchableOpacity
          onPress={onPress}
          style={LoginStyle.button}>
          <Text style={LoginStyle.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
  };
export default Login
var LoginStyle = StyleSheet.create({
     container:{
         backgroundColor: 'white' ,
         flex:1,
         padding:15,
         alignItems: "center"
     },
     textInput:{
         width:350,
         height:60,
         padding:10,
         marginTop:8,
         borderColor:"royalblue",
         borderWidth:1,
         borderRadius:8,
         backgroundColor:"azure"
     },
     button:{
         width: 350,
         backgroundColor:"dodgerblue",
         marginTop:7,
         padding: 10,
       
     },
     buttonText:{
         textAlign: "center",
         fontSize:18,
         fontWeight:"bold",
         color:"white"
     }
 })