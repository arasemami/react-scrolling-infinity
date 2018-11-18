import React from 'react';

const data = (props) => {
    function time() {
        if (props.date > 0 ) {
            if (props.date > 7) {
                return ' more than a week later'
            } else {
                return props.date + ' Daye later'
            }
        } else if (props.date < 0) {
            if (Math.abs(props.date) > 7) {
                return ' more than a week ago';
            } else {
                return Math.abs(props.date) + ' Days ago';
            }
        }else{
            return 'Today'
        }
    }


    return (
        <div className="data-parent" >
            <div className="data1">
                <div className="data2"  >
                    <h3>{props.face}</h3>
                    <div className="data-child2" >
                        <h3>size : <span>{props.size}</span> </h3>
                        <h3>price : <span>{props.price}  $</span></h3>
                        <h3>date : <span>{ time()}</span> </h3>

                    </div>
                </div>

            </div>
        </div>

    );

};

export default data;