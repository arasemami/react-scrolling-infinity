import React from 'react';

const Ads = (props) => {
    return (
        <div className="data-parent"  >
            <div className="data1" >
                <div className="data2" style={{backgroundColor : props.bgColor }}  >
                    <h1 className="ads" style={{textAlign:'center' ,  color: props.color}} >{props.ads}</h1>
                </div>
            </div>
        </div>

    );

};

export default Ads;