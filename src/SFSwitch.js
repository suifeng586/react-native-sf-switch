
/**
 * Created by Joker on 2017-08-17.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    Platform,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

export default class SFSwitch extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        duration: PropTypes.number,
        containerColor: PropTypes.string,
        containerStyle: PropTypes.object,
        onChange: PropTypes.func,
        tag: PropTypes.number

    }
    static defaultProps={
        checked:false,
        duration:200,
        disabled:false,
        containerColor:'red',
        width:80,
        height:30,
        tag:0
    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        this.checked = this.props.checked;
        if (this.props.checked){
            this.aniBgW = new Animated.Value(this.props.width);
            this.aniThumbY = new Animated.Value(1);
            this.aniThumbX = new Animated.Value(this.props.width-this.props.height);
            this.aniThumOpacity = new Animated.Value(1);
        }else{
            this.aniBgW = new Animated.Value(0);
            this.aniThumbY = new Animated.Value(0);
            this.aniThumbX = new Animated.Value(0.5);
            this.aniThumOpacity = new Animated.Value(0);
        }
    }
    componentDidMount() {

    }
    aniChecked = () => {
        Animated.parallel([
            Animated.timing(this.aniThumbX, {
                toValue: this.props.width-this.props.height,
                duration: this.props.duration,
            }),
            Animated.timing(this.aniBgW, {
                toValue: this.props.width,
                duration: this.props.duration,
            }),
            Animated.timing(this.aniThumOpacity, {
                toValue: 1,
                duration: this.props.duration,
            }),
            Animated.timing(this.aniThumbY, {
                toValue: 1,
                duration: this.props.duration,
            })
        ]).start()

    }
    aniUnChecked = () => {
        Animated.parallel([
            Animated.timing(this.aniThumbX, {
                toValue: 0,
                duration: this.props.duration,
            }),
            Animated.timing(this.aniBgW, {
                toValue: this.props.height,
                duration: this.props.duration,
            }),
            Animated.timing(this.aniThumOpacity, {
                toValue: 0,
                duration: this.props.duration,
            }),
            Animated.timing(this.aniThumbY, {
                toValue: 0,
                duration: this.props.duration,
            })
        ]).start()
    }
    clickSwitch = () => {
        if (this.props.disabled){
            return;
        }
        if (this.checked){
            this.checked = false;
            this.aniUnChecked();
        }else{
            this.checked = true;
            this.aniChecked();
        }
        if (this.props.onChange){
            this.props.onChange(this.checked,this.props.tag)
        }
    }
    render() {
        var opacity = 1;
        if (this.props.disabled){
            opacity = 0.5;
        }
        return (
            <TouchableWithoutFeedback onPress={this.clickSwitch}>
                <View style={[{
                    width:this.props.width,
                    height:this.props.height,
                    borderRadius:this.props.height/2,
                    borderWidth:1,
                    borderColor:'rgba(230,230,230,1)',
                    justifyContent:'center',
                    opacity:opacity
                },this.props.containerStyle]}>
                    <Animated.View style={{
                        width:this.aniBgW,
                        height:this.props.height,
                        overflow:'hidden',
                        backgroundColor:this.props.containerColor,
                        position:'absolute',
                        borderRadius:this.props.height/2,
                        opacity:this.aniThumOpacity,
                        left:0,
                        top:0
                    }}></Animated.View>

                    <Animated.View style={{
                        backgroundColor:'white',
                        shadowColor:'black',
                        shadowOffset:{h:3,w:3},
                        shadowRadius:2,
                        shadowOpacity:0.2,
                        height:this.props.height-2,
                        width:this.props.height-2,
                        borderRadius:this.props.height/2-1,
                        transform:[{translateX:this.aniThumbX},{translateY:this.aniThumbY}]
                    }}>

                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}