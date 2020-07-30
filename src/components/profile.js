
import React, { Component} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import queryString from 'query-string';

class userProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data:null
        }


    
    }
    componentWillMount(){
        const params = this.props.match.params.id;
        axios.get(`https://reqres.in/api/users/${params}`).then(response => {
            this.setState({
                data: response.data.data
            });
            
        }).catch(error => {
            // console.log('err', error);
            toast('some error occurred', {
                position: toast.POSITION.BOTTOM_CENTER
            });

        })
    }

    render() {
        const { data } = this.state;
        return (
            <div className="login-3 tab-box">
                {
                    data != null?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-pad-0 form-section">
                            <div className="login-inner-form">
                                <div className="details">
                                    <div className="col-md-12 heading-bx left" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                        <h3 >Details</h3>
                                        <img src={data.avatar} alt=""></img>
                                        <h5>{data.first_name}</h5>
                                        <h5>{data.last_name}</h5>
                                        <h5>{data.email}</h5>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>loading</div>
    }
            </div>
        )
    }
}
export default userProfile