import React, { useState, useEffect } from "react";
import axios from "axios";


function BabyRecord() {
    const [state, setstate] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.get(
            process.env.REACT_APP_URL+'/allBabyDetails',
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                setstate(
                    res.data.results.map(row => ({
                        baby_medical_record_number: row.baby_medical_record_number,
                        hospital_name: row.hospital_name,
                        hospital_branch_name: row.hospital_branch_name,
                        id: row.id
                    }))
                );
            }
        );
    };

    const columns = [
        {
            title: "Baby medical record number",
            dataIndex: "baby_medical_record_number",
            width: 150,
            render: (text, record) => <a href={'record/' + record.baby_medical_record_number}>{text}</a>
        },
        {
            title: "Hospital",
            dataIndex: "hospital_name",
            width: 150
        },
        {
            title: "Branch",
            dataIndex: "hospital_branch_name",
            width: 150
        },
        {
            title: "Date of Admission",
            dataIndex: "baby_date_of_admission",
            width: 150
        }
    ];

    return (
        <div>
            {loading ? (
                "Loading"
            ) : (
                   <div>Hiiiiiii</div>
                )}
        </div>
    );
}

export default BabyRecord;