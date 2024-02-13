
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Linking} from 'react-native';
import { firebase_auth } from './firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; // Certifique-se de importar corretamente a função de autenticação do Firebase
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = firebase_auth;

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
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
      <Image source={require("./imagens/logo_perfeita.jpg")} style={styles.logo} />        
        <TextInput
            style={styles.input}
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
const HomeScreen = () => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>   
        <View style={styles.container4}>
            <View style={styles.headerContainer1}>
            <Text style={styles.headerText}>  Leitura dos sensores</Text>
            </View>

        <View style={styles.caixaContainer}>
          <View style={styles.caixa}>
            <Text style = {styles.title2}> Temperatura</Text>
            <Image source={require("./imagens/temp.jpg")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>33 °C</Text>
          </View>
          <View style={styles.caixa}>
          <Text style = {styles.title2}> Alcalinidade </Text>
            <Image source={require("./imagens/ph.jpg")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>6,6</Text>
          </View>
          <View style={styles.caixa}>
          <Text style = {styles.title2}> Turbidez </Text>
            <Image source={require("./imagens/turbidez.jpg")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>Limpo</Text>
          </View>
          <View style={styles.caixa}>
          <Text style = {styles.title2}> Concetração de gases </Text>
            <Image source={require("./imagens/gas.jpg")} style={styles.imagemNaCaixa} />
            <Text style={styles.textoNaCaixa}>Normal</Text>
          </View>
        </View>
      </View>
      </ScrollView>
        
    );

    const GraphScreen = () => (
      <ScrollView contentContainerStyle={styles.scrollContainer}>   
            <View style={styles.container4}>
                <View style={styles.headerContainer1}>
                <Text style={styles.headerText}>  Leitura dos sensores</Text>
                </View>
    
            <View style={styles.caixaContainer}>
              <View style={styles.caixa}>
                <Text style = {styles.title2}> Temperatura</Text>
                <Image source={require("./imagens/temp.jpg")} style={styles.imagemNaCaixa} />
                <Text style={styles.textoNaCaixa}>33 °C</Text>
              </View>
              <View style={styles.caixa}>
              <Text style = {styles.title2}> Alcalinidade </Text>
                <Image source={require("./imagens/ph.jpg")} style={styles.imagemNaCaixa} />
                <Text style={styles.textoNaCaixa}>6,6</Text>
              </View>
              <View style={styles.caixa}>
              <Text style = {styles.title2}> Turbidez </Text>
                <Image source={require("./imagens/turbidez.jpg")} style={styles.imagemNaCaixa} />
                <Text style={styles.textoNaCaixa}>Limpo</Text>
              </View>
              <View style={styles.caixa}>
              <Text style = {styles.title2}> Concetração de gases </Text>
                <Image source={require("./imagens/gas.jpg")} style={styles.imagemNaCaixa} />
                <Text style={styles.textoNaCaixa}>Normal</Text>
              </View>
            </View>
          </View>
          </ScrollView>
            
        );

/* para add o usuario logado:

              <View style={styles.caixa2}>
                <Text style = {styles.title1}>Usuário logado: </Text>
                <Text style = {styles.title2}> {email} </Text>
                </View>

*/


// Tela de Configuração
const SettingsScreen = ({email}) => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>   
  <View style={styles.container5}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerText2}>  Informações</Text>
            </View>

            
              <View style={styles.caixaContainer}>



                <View style={styles.caixa2}>
                <Text style = {styles.title1}>Como funciona? </Text>
                 <Text style = {styles.title2}>O sistema é composto por um microcontrolador e por 3 sensores em campo. As leituras dos sensores são feitas 5 vezes ao dia. O microcontrolador recebe os dados coletado e em seguida envia os dados atráves da comunicação LoRa P2P. </Text>
                </View>

                <View style={styles.caixa2}>
                <Text style={styles.title1}>Link para o Firebase </Text>
                <Text style={{ ...styles.title2, color: 'blue', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://sist-qualidade-agua-default-rtdb.firebaseio.com')}>
                  https://sist-qualidade-agua-default-rtdb.firebaseio.com
                </Text>
                </View>

                

                <Text style = {styles.title5}>Parâmetros dos sensores: </Text>

                <View style={styles.caixa2}>
                <Text style = {styles.title1}>i. Sensor ST100 </Text>
                <Text style = {styles.title2}>• Leituras acima de '700' = água limpa </Text>
                <Text style = {styles.title2}>• Leituras entre '600' e '700' = água com porcentagem relevante de resíduos </Text>
                <Text style = {styles.title2}>• Leituras abaixo de '600' = água com elevada quantidade de resíduos </Text>
                </View>

                <View style={styles.caixa2}>
                <Text style = {styles.title1}>ii. Sensor DS18B20 </Text>
                <Text style = {styles.title2}>Normal: até 31°C  </Text>
                </View>

                <View style={styles.caixa2}>
                <Text style = {styles.title1}>iii. Sensor MQ135 </Text>
                <Text style = {styles.title2}>• Amônia (NH3)</Text>
                <Text style = {styles.title2}>• Dióxido de carbono (CO2)</Text>
                <Text style = {styles.title2}>• Benzeno (C6H6)</Text>
                <Text style = {styles.title2}>• Óxido nítrico (NOx)</Text>
                <Text style = {styles.title2}>• Fumaça</Text>
                </View>

                <View style={styles.caixa2}>
                <Text style = {styles.title1}>iv. Sensor de PH </Text>
                <Text style = {styles.title2}>• Normal: 6.5 e 7.5</Text>
                </View>

            <StatusBar style="auto" />
        </View>
        </View>
        </ScrollView>
    );

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

const MainTabs = ({email}) => (
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
          return <AntDesign name="linechart" size={24} color="#5772ff" />;
          }
          return <AntDesign name="linechart" size={24} color="grey" />;
      },
      }} />

    <Tab.Screen name="Configurações" component={SettingsScreen}
    options={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused, size, color }) => {
          if (focused) {
          return <Ionicons name="information-circle" size={24} color="#5772ff" />;
          }
          return <Ionicons size={size} color={color} name="information-circle-outline" />;
      },
      }} />

  </Tab.Navigator>
);

// Componente principal
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs />
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
    marginBottom: 80,
    height: 250,
    width: 250,
    backgroundColor: "#F3F3F3"
  },
  button: {
    backgroundColor: "#F3F3F3",
    width: "40%",
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
  container4: {
    flex: 1,
    backgroundColor: "#b5cacf",   //#B0C4DE
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  }, 
  headerContainer1: {
      backgroundColor: '#477b87', // Cor de fundo do cabeçalho
      width: "100%",
      height: 120,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRadius: 10

  },
  headerText: {
      color: '#F3F3F3', // Cor do texto do cabeçalho
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: -70    // para ajustar aonde fica a palavra
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
      fontFamily: 'Roboto', 
      color: "#273b5e",
      fontWeight: '500',
      alignContent: 'space-between'
  },
  caixaContainer: {
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
  textoNaCaixa: {
      fontSize: 23,
      fontWeight: 'bold',
      color: '#273b5e'
  },
  container5: {
    flex: 1,
    backgroundColor: "#b5cacf",   
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%"

  }, 
  headerContainer: {
      
      backgroundColor: '#477b87', // Cor de fundo do cabeçalho
      width: "100%",
      height: 120,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRadius: 10

  },
  headerText2: {
      color: '#F3F3F3', // Cor do texto do cabeçalho
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: -70
  },
  negrito:{
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      color: "#000000",

  },
  title1: {
      fontSize: 20,
      fontFamily: 'Roboto', 
      color: "#273b5e",
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: 10,
      fontWeight: 'bold'
  },
  title2: {
      fontSize: 20,
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
      alignSelf: 'flex-end',
      borderRadius: 9,
      borderColor: "#d7dfe1",  //#DCDCDC
      borderWidth: 4,
      textAlign: 'left',
      fontSize: 30,
  },
  caixaContainer: {
      flexDirection: 'row', // Dispor os itens lado a lado
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap', // Quebrar linha se não houver espaço suficiente
    },
    title5: {
      fontSize: 23,
      fontFamily: 'Roboto', 
      color: "#273b5e",
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: 10,
      fontWeight: 'bold'

    }



    });


    