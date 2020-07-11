import React, { useState } from 'react';
import ApiService from "../utils/apiService";

const ViewProvider = (props) => {
    const [provider, setProvider] = useState({})
    const  providerId = props.match.params.provider;
    const url = ApiService.ENDPOINTS.providers + '/' + providerId;
    !Object.keys(provider).length && ApiService.get(url)
        .then(res => {
            setProvider(res);
        })
        .catch(console.log);
    return (
        // TASK 6:
        // Render Single Provider View Here
        // Feel free to using existing styles,
        // or add new ones if you want to :)
        //
        // For Bonus points, you can also add functionality to edit the provider
        // Reusing the NewProviderForm component for this will make it a whole lot easier :D
        <div className="provider">
            <div className="desc">{provider?.name} <span><i className="fa fa-edit"></i></span></div>
            <img src={provider?.images ? provider?.images[0].url : 'https://via.placeholder.com/1500x840'} />

            {
                provider?.images?.map(item => (
                    <div className="thumbnail">
                        <img src={item.url} />
                    </div>
                ))
            }
        </div>
    )
};

export default ViewProvider;
