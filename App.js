
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Linking, FlatList} from 'react-native';
import { firebase_auth } from './firebaseConfig'; 
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Certifique-se de importar corretamente a função de autenticação do Firebase
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { getDatabase, ReferenceError , onValue, ref, DataSnapshot } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = firebase_auth;




const LoginScreen = ({setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      await AsyncStorage.setItem('loggedInUser', email);
      alert('Autenticação verificada!');
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        // Defina a mensagem de erro para credenciais inválidas
        alert('Email e/ou senha inválidos!');
      } else {
        // Defina a mensagem de erro padrão para outros erros
        alert('Falha na autenticação: ' + error.message);
        console.log(error);
      }
    }
    
  };

  return (
    <View style={styles.container}>
      <Image source={require("./imagens/outra_logo.jpg")} style={styles.logo} />        
        <TextInput
            style={styles.input2}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
        />

        <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>


        </View>
  );
};

// Tela de Home
const HomeScreen = () => {

  const [userData, setUserData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const dbRef = ref(db, '/Users/4'); // Referência ao nó '/User/3' no banco de dados
        console.log('Recebendo dados...');

        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Obtemos as chaves dos nós filhos e selecionamos o último
            const latestChildKey = Object.keys(data).pop();
            const latestChildData = data[latestChildKey];
            setUserData(latestChildData); // Atualizando o estado com os dados recebidos
            console.log('Dados recebidos:', latestChildData);
          } else {
            console.error('Nenhum dado encontrado.');
          }
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };

    fetchData();
  }, []);

  const userIds = Object.keys(userData);


return (
  <ScrollView contentContainerStyle={{...styles.scrollContainer, backgroundColor: "#477b87"}}>   
      
          <View style={styles.headerContainer1}>
            <Text style={styles.headerText}>Leitura dos sensores</Text>
          </View>
          
          <View style={{...styles.caixaContainer, backgroundColor: '#b5cacf', borderTopLeftRadius: 50, borderTopRightRadius:50}}>
            <View style={styles.caixa}>
                <Text style={styles.title2}>Temperatura</Text>
                <Image source={require("./imagens/temperatura.gif")} style={styles.imagemNaCaixa} />
                <Text style={styles.textoNaCaixa}>{userData.tempAgua} °C </Text>
            </View>
          <View style={styles.caixa}>
            <Text style = {styles.title2}> Alcalinidade </Text>
            <Image source={require("./imagens/fermentacao2.png")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>{userData.ph} </Text>
          </View>
          <View style={styles.caixa}>
            <Text style = {styles.title2}> Turbidez </Text>
            <Image source={require("./imagens/detritos-marinhos.png")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>{userData.turb} </Text>
          </View>
          <View style={styles.caixa}>
            <Text style = {styles.title2}> Concetração de gases </Text>
            <Image source={require("./imagens/poluicao-do-ar.gif")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>{userData.gas} </Text>
          </View>

            
          
            </View>
      </ScrollView>
        
        );
      };

  

  const GraphScreen = () => {
    const [userData, setUserData] = useState('');
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const db = getDatabase();
          const dbRef = ref(db, '/Users/4'); // Referência ao nó '/User' no banco de dados
          console.log('Recebendo dados...');
  
          // Obtendo os dados do banco de dados Firebase
          onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setUserData(data); // Atualizando o estado com os dados recebidos
            console.log('Dados recebidos:', data);
          });
        } catch (error) {
          console.error('Erro ao buscar dados:', error.message);
        }
      };
    
      fetchData();
    }, []);



  const userIds = Object.keys(userData);

  return (
    <ScrollView contentContainerStyle={{...styles.scrollContainer, backgroundColor: "#477b87", horizontal: false}}>   
      <View style={styles.headerContainer1}>
        <Text style={styles.headerText}>Histórico</Text>
      </View>  

      
      <View style={{...styles.caixaContainer, backgroundColor: '#b5cacf', borderTopLeftRadius: 50, borderTopRightRadius:50}}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.headerCell1}>Data</Text>
            <Text style={styles.headerCell1}>Temperatura</Text>
            <Text style={styles.headerCell1}>PH</Text>
            <Text style={styles.headerCell1}>Turbidez</Text>
            <Text style={styles.headerCell1}>Gás</Text>
          </View>
          {userIds.map((userId) => (
            <View style={styles.row} key={userId}>
              <Text style={styles.cell}>{userId}</Text>
              <Text style={styles.cell}>{userData[userId].tempAgua}</Text>
              <Text style={styles.cell}>{userData[userId].ph}</Text>
              <Text style={styles.cell}>{userData[userId].turb}</Text>
              <Text style={styles.cell}>{userData[userId].gas}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

  
// Tela de Configuração
const SettingsScreen = ({ setIsLoggedIn }) => {

  const signOutApp = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
      console.log(setIsLoggedIn)
      alert('Logout realizado com sucesso!');
      
      setIsLoggedIn(false);
    } catch (error) {
      alert('Falha na autenticação: ' + error.message);
      console.log(error);
    }
  };

  const [loggedInUser, setLoggedInUser] = useState(null);


  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    getLoggedInUser();
  }, []);

  /*  <Image source={require("./imagens/amazonas.png")} style={styles.imagemNaCaixa} />   */
 
  return(
    <ScrollView contentContainerStyle={{...styles.scrollContainer, backgroundColor: "#477b87"}}>   

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Informações</Text>
              
            </View>           
              <View style={{...styles.caixaContainer, backgroundColor: '#b5cacf', borderTopLeftRadius: 50, borderTopRightRadius:50}}>
                <View style={styles.caixa3}>
                  <Image source={require("./imagens/user.jpg")} style={styles.imagemTopico} />
                  <Text style = {styles.title1}>Usuário logado: </Text>
                  <Text style = {{...styles.title2, color: '#5e81bf'}}>{loggedInUser} </Text>
                  <Button title='Logout' onPress={signOutApp}></Button>
                </View>

                <View style={styles.caixa2}>
                  <Image source={require("./imagens/tool.jpg")} style={styles.topicoCaixa} />
                  <Text style = {styles.title3}>Como funciona? </Text>
                  <Text style = {styles.title2}>O sistema é composto por um microcontrolador e por 3 sensores em campo. As leituras dos sensores são feitas 5 vezes ao dia. O microcontrolador recebe os dados coletado e em seguida envia os dados atráves da comunicação LoRa P2P. </Text>
                </View>

                  <View style={styles.caixa2}>
                  <Image source={require("./imagens/dominio.png")} style={styles.topicoCaixa2} />
                  <Text style={styles.title3}>Link para o Firebase </Text>
                  <Text style={{ ...styles.title2, color: '#5e81bf', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://sist-react-default-rtdb.firebaseio.com')}>
                  https://sist-react-default-rtdb.firebaseio.com
                  </Text>
                  </View>

                  <Text style = {styles.title5}>Parâmetros dos sensores </Text>

                  <View style={styles.caixa2}>
                  <Text style = {styles.title6}>i. Sensor DS18B20 </Text>
                  <Text style = {styles.title2}>• Normal: até 31°C  </Text>
                  </View>

                  <View style={styles.caixa2}>
                  <Text style = {styles.title6}>ii. Sensor de PH </Text>
                  <Text style = {styles.title2}>• Normal: 6.5 e 7.5</Text>
                  </View>

                  <View style={styles.caixa2}>
                  <Text style = {styles.title6}>iii. Sensor ST100 </Text>
                  <Text style = {styles.title2}>• Leituras acima de '700' = água limpa </Text>
                  <Text style = {styles.title2}>• Leituras entre '600' e '700' = água com porcentagem relevante de resíduos </Text>
                  <Text style = {styles.title2}>• Leituras abaixo de '600' = água com elevada quantidade de resíduos </Text>
                  </View>


                  <View style={styles.caixa2}>
                  <Text style = {styles.title6}>iv. Sensor MQ135 </Text>
                  <Text style = {styles.title2}>• Amônia (NH3)</Text>
                  <Text style = {styles.title2}>• Dióxido de carbono (CO2)</Text>
                  <Text style = {styles.title2}>• Benzeno (C6H6)</Text>
                  <Text style = {styles.title2}>• Óxido nítrico (NOx)</Text>
                  <Text style = {styles.title2}>• Fumaça</Text>
                  </View>

                                                  
              <StatusBar style="auto" />
          </View>
   
          </ScrollView>
        );
      };



// Configuração da navegação em Stack para a tela de Login
const Stack = createStackNavigator();

const LoginStack = ({ setIsLoggedIn }) => (
  <Stack.Navigator>
    <Stack.Screen name="Login" options={{headerShown: false}}>
      {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
  </Stack.Navigator>
);

// Configuração da navegação em Tabs para as telas de Home e Configuração
const Tab = createBottomTabNavigator();

const MainTabs = ({setIsLoggedIn}) => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen}
      options={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
            return <Ionicons size={size} color={color} name="document" />;
            }
            return <Ionicons size={size} color={color} name="document-outline" />;
        },
        }} />
    
    <Tab.Screen name="Graficos" component={GraphScreen}
      options={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
            return <AntDesign name="table" size={24} color="#5772ff" />;
            }
            return <AntDesign name="table" size={24} color="grey" />;
        },
      }}></Tab.Screen>
   <Tab.Screen name="Configurações"
    options={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
                return <Ionicons name="information-circle" size={24} color="#5772ff" />;
            }
            return <Ionicons size={size} color={color} name="information-circle-outline" />;
        },
    }}>
    {() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
</Tab.Screen>

  </Tab.Navigator>
);



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#477b87",   //#131d2f
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 50,
    height: 150,
    width: 150,
    backgroundColor: "#F3F3F3",
    marginTop: -75
  },
  button: {
    backgroundColor: "#F3F3F3",
    width: "30%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: "#bdcbce",
    borderWidth: 4,
    //marginTop: 40,
  },
  button2: {
    backgroundColor: "#F3F3F3",
    width: "40%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 10,
    borderBottomColor: "#547e8b",
    borderWidth: 4,
  },
  buttonText: {
    color: "#30668B",
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: "#F3F3F3",
    marginTop: 70,
    marginBottom: 10,
    marginVertical: 60
  },
  input: {
    backgroundColor: "#F3F3F3",
    width: "80%",
    height: 50,
    marginBottom: 20,
    borderRadius: 30,
    paddingHorizontal: 20,

  },
  input2: {
    backgroundColor: "#F3F3F3",
    width: "80%",
    height: 50,
    marginBottom: 20,
    
    borderRadius: 30,
    paddingHorizontal: 20,

  },
  container4: {
    flex: 1,
    //height: 1500,
    backgroundColor: "#b5cacf",   //#B0C4DE
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  }, 
  headerContainer1: {
      flex:1,
      backgroundColor: '#477b87', // Cor de fundo do cabeçalho
      width: "100%",
      height: 150,
      justifyContent: 'center',
      alignItems: 'flex-start',
      //borderRadius: 10

  },
  headerText: {
      color: '#F3F3F3', // Cor do texto do cabeçalho
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      width: "100%",
      marginBottom: -70,    // para ajustar aonde fica a palavra
      textAlign: 'center',

  },

  caixa: {
      margin: 30,
      width: "80%",
      height: 190,
      backgroundColor: "#ffffff",   
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      borderRadius: 30,
      borderColor: "#d7dfe1",  //#DCDCDC
      borderWidth: 4,
      textAlign: 'center',
      fontSize: 30,
    

  },title2: {
      fontSize: 25,
      
      color: "#273b5e",
      fontWeight: '500',
      //alignContent: 'space-between',
      textAlign: 'justify',
      alignItems : 'flex-start',
  },
  title6: {
    fontSize: 19,
      fontFamily: 'Roboto', 
      color: "#273b5e",
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: 10,
      fontWeight: 'bold',
      marginLeft: 10,
},
  caixaContainer: {
    flex:2,
    marginTop:300,
    backgroundColor : 'red',
    height: 1300,
    borderTopLeftRadius: 20 ,
    borderTopRightRadius: 20,
    padding: 10,
    flexDirection: 'row', // Dispor os itens lado a lado
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap', // Quebrar linha se não houver espaço suficiente
  },
  imagemNaCaixa: {
      width: 100,
      height: 100,
      borderRadius: 15,
      marginBottom: 10,
  },
  /*
  imagemTopico: {
    width:25,
    height:25,
    borderRadius: 15,
    marginLeft: 5,
      */
  imagemTopico: {
    width: 40,
    height: 40,
    //marginRight: 10, 

  },
  topicoCaixa: {
    width: 40,
    height: 40,
    marginBottom: -45,
    //marginRight: 15,
    marginLeft: 0,
    marginRight : -100,
    
  },
  topicoCaixa2: {
    width: 30,
    height: 30,
    marginBottom: -38,
    marginLeft: 5,
    marginRight : -100,
    
  },
  textoNaCaixa: {
      fontSize: 23,
      fontWeight: 'bold',
      color: '#273b5e',
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 7, 9, 0.5)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
  },
  container5: {
    flex: 1,
    backgroundColor: "#b5cacf",   
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    height:1500,

  }, 
  headerContainer: {
      
      backgroundColor: '#477b87', // Cor de fundo do cabeçalho
      width: "100%",
      height: 150,
      justifyContent: 'center',
      alignItems: 'flex-start',

  },
  headerText2: {
      color: '#F3F3F3', // Cor do texto do cabeçalho
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: -70,
      textAlign: 'center',
  },
  negrito:{
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      color: "#000000",

  },
  title1: {
      fontSize: 19,
      fontFamily: 'Roboto', 
      color: "#273b5e",
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: 10,
      fontWeight: 'bold',
      marginLeft: 4,
  },
  title3: {
    fontSize: 19,
    fontFamily: 'Roboto', 
    color: "#273b5e",
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    marginLeft: 45,
    marginTop: 13,
    
},
  title2: {
      fontSize: 17,
      fontFamily: 'Roboto', 
      color: "#273b5e",
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: 10,
      fontWeight: '500'
  },
  textoExplicativo: {
      fontSize: 25,
      marginBottom: 1,
      marginTop: 20,
      
  },
  caixa2: {
      marginTop: 20,
      margin: 10,
      width: "90%",
      height: 'auto',
      backgroundColor: "#ffffff",   
      alignItems: 'justify',
      alignContent: 'space-between',
      justifyContent: 'left',
      alignSelf: 'auto',
      borderRadius: 9,
      borderColor: "#d7dfe1",  //#DCDCDC
      borderWidth: 4,
      textAlign: 'left',
      fontSize: 30,
      marginHorizontal: 20,
      flexDirection: 'column',
      
      
  },
  caixa3: {
    marginTop: 20,
      margin: 10,
      width: "90%",
      height: 'auto',
      backgroundColor: "#ffffff",   
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'left',
      alignSelf: 'flex-end',
      borderRadius: 9,
      borderColor: "#d7dfe1",  //#DCDCDC
      borderWidth: 4,
      textAlign: 'left',
      fontSize: 30,
      flexDirection: 'row',

  },
  caixa4: {
    marginTop: 20,
      margin: 10,
      width: "90%",
      height: 'auto',
      backgroundColor: "#ffffff",   
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'left',
      alignSelf: 'flex-end',
      borderRadius: 9,
      borderColor: "#d7dfe1",  //#DCDCDC
      borderWidth: 4,
      textAlign: 'left',
      fontSize: 30,
      flexDirection: 'row',

  },
  caixaContainer: {
      flexDirection: 'row', // Dispor os itens lado a lado
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap', // Quebrar linha se não houver espaço suficiente
      height: 1350,
    },
    title5: {
      fontSize: 25, 
      color: "#273b5e",
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: 10,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 7, 9, 0.5)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      

    },
    table: {
      width: "80%",
      marginTop: 150,
      borderRadius: 10,
      borderWidth: 4,
      borderColor: "#d7dfe1",
      backgroundColor: '#b5cacf',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: 'white',
    },
    headerCell: {
      flex: 1,
      paddingVertical: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      backgroundColor: '#f2f2f2',
    },
    cell: {
      flex: 1,
      paddingVertical: 10,
      textAlign: 'center',
      color: '#555',
    },
    headerCell1: {
      flex: 1,
      paddingVertical: 10,
      //borderTopRightRadius: 20,
      //borderTopLeftRadius:20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      backgroundColor: '#f2f2f2',
    },
    splashContainer: {
      flex: 1,
      backgroundColor: "#477b87",
      alignItems: 'center',
      justifyContent: 'center',
    },
    splashText: {
      fontSize: 30,
      color: "#F3F3F3",
      fontWeight: 'bold',
      marginTop: 20,
    },

    
  });


/*

table: {
      width: "80%",
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#000000',
      marginTop: 120,
      borderRadius: 10,
      borderBottomColor: "blue",
      borderColor: '#273b5e',
      borderWidth: 3,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10,
      borderTopLeftRadius:10,
      borderStyle: 'dashed',


    },
    row: {
      flexDirection: 'row',
      //borderRadius: 10,
      borderColor: '#030f96',
      backgroundColor: 'white',
      borderBottomColor: '#ccc',

    },
    headerCell: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f2f2f2',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      alignContent: 'center',
      textAlign: 'center',
      backgroundColor: 'white',
    },
    cell: {
      flex: 1,
      padding: 10,
      borderWidth: 0.5,
      alignContent: 'space-around',
      alignItems: 'center', 
      textAlign: 'center',
      color: '#555',
      borderColor: '#273b5e',
    },


*/

    