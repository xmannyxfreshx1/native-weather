/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  ImageBackground,
  Button,
  FlatList
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor() {
        super();
        this.state = {
            condition: null,
            temperature:null,
            city: null,
            country:null,
            icon:null,
            forecast:null,
            fahrenheit: false,
            celsius: false,
            officialCity:null,
            officialCountry: null
        };

    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("GOT THE FUCKING POSITION DATA!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(position);
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            },
            (error) => {console.log(error)},
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
        );
    }

    api_call(){
        const City = this.state.city;
        const Country= this.state.country;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City},${Country}&appid=3a5fbdb21d0c6479ff9cff57c0e067bc`)
            .then(function (response) {
                return response.json();

            })
            .then((json) => {
                Keyboard.dismiss();
                this.setState({
                    condition: json.weather[0].description,
                    temperature: json.main.temp,
                    icon: json.weather[0].icon,
                    officialCountry: json.sys.country,
                    officialCity: json.name
                });
            });
    }

    forecastApi_call(){
        const City2 = this.state.city;
        const Country2 = this.state.country;
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${City2},${Country2}&appid=3a5fbdb21d0c6479ff9cff57c0e067bc`)
            .then(function (response) {
                return response.json();

            })
            .then((json) => {
                this.setState({
                    forecast: json.list
                });
            });
    }


    switchBackground = (condition) =>{
        switch (condition){
            case '01d':
            case '01n':
                return 'iXAF_YbZ2ow';
            case '02d':
            case '02n':
                return 'SdfWSj1rmRg';
            case '03d':
            case '03n':
                return 'jOsXXpiJKpA';
            case '04d':
            case '04n':
                return 'SdfWSj1rmRg';
            case '09d':
            case '09n':
                return 'FgEJJiZuMOM';
            case '10d':
            case '10n':
                return 'p_HYA_T-1WU';
            case '13d':
            case '13n':
                return 'NROJUYgpjKE';
            case '50d':
            case '50n':
                return 'p1FmDAyqAuE';
            default:
                return 'x1Qw2gCPMUU';
        }
    };

    switchTemp = (unit) => {
        switch (unit){
            case 'fahrenheit':
                return Math.trunc((this.state.temperature)* (9 / 5) - 459.67);
            case 'celsius':
                return Math.trunc((this.state.temperature) - 273.15);
            default:
                return null;
        }
    };

    tempSelect = (unit) =>{
        switch(unit){
            case 'fahrenheit':
                this.setState({
                    fahrenheit: true,
                    celsius: false
                });
                break;
            case 'celsius':
                this.setState({
                    fahrenheit: false,
                    celsius: true
                });
                break;
            default:
                return null;

        }
    };

        render() {

            const forecastData = this.state.forecast;

            // const forecastList = this.state.forecast.map( weather => {
            //     console.log(weather.dt);
            // })

            return (
                <ImageBackground source={{uri:`https://source.unsplash.com/${this.switchBackground(this.state.icon)}`}} style={{flex:1}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row', borderColor:'black', borderWidth:1, margin:10}}>
                        <TextInput
                        style={{flex:1, height:50, width:20, backgroundColor:'white', fontSize:16}}
                        placeholder='City'
                        onChangeText={ (city) => this.setState({city})}
                        value={this.state.city}
                        />
                        <TextInput
                        style={{flex:1, height:50, width:20, backgroundColor:'white', fontSize:16}}
                        placeholder='Country'
                        onChangeText={ (country) => this.setState({country})}
                        value={this.state.country}
                        />
                        <View style={{flex:1, height:50, width:20, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={() =>this.api_call()}>
                                <Text style={{fontSize:20}}>GO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{flex:1, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'blue', margin:10}}>
                        <Text style={{fontSize:20}}>
                            { this.state.temperature ? <Text style={{fontSize:40}}>{this.state.officialCity}, {this.state.officialCountry}</Text>: <Text style={{fontSize:40}}>Search for Weather</Text> }
                        </Text>
                    </View>


                    <View style={{flex:1, flexDirection: 'row', borderWidth:1, borderColor:'yellow', margin:10}}>

                        <View style={{flex:1, borderWidth:1, borderColor:'green' }}>
                            <Image source={{uri: `https://openweathermap.org/img/w/${this.state.icon}.png`}} style={{flex:1}}/>
                        </View>

                        <View style={{flex:2, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>

                            <View style={{flex:2}}>
                                <Text style={{ fontWeight:'bold', fontSize:30, color:'red'}}>Current Weather</Text>
                            </View>

                            <View style={{flex:1, flexDirection:'row', borderWidth:1, borderColor:'red'}}>
                                <View  style={{flex:1, borderWidth:1, borderColor:'purple', justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>
                                    <Text style={{ fontWeight:'bold', fontSize:15, color:'red'}} onPress={() => this.tempSelect('celsius')} >CELSIUS</Text>
                                </View>

                                <View style={{flex:1, borderWidth:1, borderColor:'orange', justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>
                                    <Text style={{ fontWeight:'bold', fontSize:15, color:'red'}} onPress={() => this.tempSelect('fahrenheit')} >FAHRENHEIT</Text>
                                </View>
                            </View>

                            <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{ fontWeight:'bold', fontSize:30, color:'red'}}>{this.state.fahrenheit ? this.switchTemp('fahrenheit'): ''}</Text>
                                <Text style={{ fontWeight:'bold', fontSize:30, color:'red'}}>{this.state.celsius ? this.switchTemp('celsius'): ''}</Text>
                            </View>

                        </View>

                    </View>


                    <View style={{flex:2, flexDirection: 'row', borderWidth:1, borderColor:'red', margin:10}}>
                      <ScrollView style={{flex:1, flexDirection:'column'}}>
                        <View  style={{flex:1, borderWidth:1, borderColor:'purple'}}>

                            <Button
                                onPress={() => this.forecastApi_call()}
                                title="5 DAY FORECAST"
                            />

                        </View>

                        <View style={{flex:1, borderWidth:1, borderColor:'orange'}}>

                            <FlatList
                                data = {this.state.forecast}
                                renderItem={({item}) => (
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Image source={{uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`}} style={{height:40, width:40}}/>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text style={{color:'black'}}>{item.weather[0].icon}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text style={{color:'black'}}>{item.weather[0].icon}</Text>
                                        </View>
                                    </View>

                                )}
                            />
                            </View>




                      </ScrollView>
                    </View>
                    </View>


                </ImageBackground>
            );
        }
}



    const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
    });


