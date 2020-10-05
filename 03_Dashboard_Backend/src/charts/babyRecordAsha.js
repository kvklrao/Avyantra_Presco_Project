const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const babyRecordAsha = async (req, res) => {
    let baby_record = req.query.baby_record;
    let reading = req.query.reading;
    console.log(baby_record)
    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);

    // var mail = decoded.name;
    // const user = await DashboardUser.findOne({ where: { email: mail } });

    // var userId = user.user_id;


    const [results, metadata] = await sequelize.query(`select
    a.id AS study_id,
    a.baby_medical_record_number AS baby_medical_record_number,
    a.baby_mother_medical_record_number AS baby_mother_medical_record_number,
    b.baby_admission_type AS baby_admission_type,
    b.baby_place_of_birth_name AS baby_place_of_birth_name,
    b.baby_birth_date AS baby_birth_date,
    cast(replace(b.baby_birth_time_hours, 'NA', 99999) as unsigned) AS baby_birth_time_hours,
    cast(replace(b.baby_birth_time_minit, 'NA', 99999) as unsigned) AS baby_birth_time_minit,
    cast(replace(b.baby_age_of_admission, 'NA', 99999) as unsigned) AS baby_age_of_admission,
    b.place_of_delivery AS place_of_delivery,
    b.birth_facility AS birth_facility,
    cast(replace(b.baby_gestational_age, 'NA', 99999) as unsigned) AS baby_gestational_age,
    cast(replace(b.baby_weight_at_admission, 'NA', 99999) as unsigned) AS baby_weight_at_admission,
    cast(replace(b.baby_weight_at_birth, 'NA', 99999) as unsigned) AS baby_weight_at_birth,
    b.baby_preterm AS baby_preterm,
    b.baby_date_of_admission AS baby_date_of_admission,
    cast(replace(c.mother_weight, 'NA', 99999) as unsigned) AS mother_weight,
    cast(replace(c.mother_height, 'NA', 99999) as unsigned) AS mother_height,
    cast(replace(c.mother_age, 'NA', 99999) as unsigned) AS mother_age,
    cast(replace(c.mother_bmi, 'NA', 99999) as unsigned) AS mother_bmi,
    cast(replace(c.maternal_blood_pressure, 'NA', 99999) as unsigned) AS maternal_blood_pressure,
    cast(replace(c.maternal_blood_pressure_diastolic, 'NA', 99999) as unsigned) AS maternal_blood_pressure_diastolic,
    c.maternal_diabetes AS maternal_diabetes,
    c.rupture_of_membranes_rom AS rupture_of_membranes_rom,
    c.rupture_of_membranes_rom_one AS rupture_of_membranes_rom_one,
    cast(replace(c.rupture_of_membranes_rom_two, 'NA', 99999) as unsigned) AS rupture_of_membranes_rom_two,
    c.type_of_delivery AS type_of_delivery,
    c.delayed_cord_clamping AS delayed_cord_clamping,
    d.baby_appearance AS baby_appearance,
    d.breast_feeding_initiation AS breast_feeding_initiation,
    d.baby_feeding_status AS baby_feeding_status,
    cast(replace(f.baby_blood_pressure_upper_limb, 'NA', 99999) as unsigned) AS baby_blood_pressure_upper_limb,
    cast(replace(f.baby_blood_pressure_lower_limb, 'NA', 99999) as unsigned) AS baby_blood_pressure_lower_limb,
    cast(replace(f.baby_blood_pressure_mean_arterial_bp, 'NA', 99999) as unsigned) AS baby_blood_pressure_mean_arterial_bp,
    f.urine_output AS urine_output,
    cast(replace(h.frequency_of_stools, 'NA', 99999) as unsigned) AS frequency_of_stools,
    h.vomiting AS vomiting,
    h.abdominal_dystension AS abdominal_dystension,
    e.retraction AS retraction,
    e.fast_breathing AS fast_breathing,
    e.baby_chest_indrawing AS baby_chest_indrawing,
    h.baby_movement AS baby_movement,
    j.baby_name AS baby_name,
    j.mother_name AS mother_name,
    i.blood_culture_report AS blood_culture_report
from
    ((((((((avyantra_dev.patient_basic_infos a
join avyantra_dev.patient_general_infos b on
    ((a.id = b.study_id)))
join avyantra_dev.patient_maternal_infos c on
    ((a.id = c.study_id)))
join avyantra_dev.patient_baby_appears_infos d on
    ((a.id = d.study_id)))
join avyantra_dev.patient_baby_resp_infos e on
    (((a.id = e.study_id)
    and (d.reading = e.reading))))
join avyantra_dev.patient_baby_cv_infos f on
    (((a.id = f.study_id)
    and (d.reading = f.reading))))
join avyantra_dev.patient_baby_git_infos h on
    (((a.id = h.study_id)
    and (d.reading = h.reading))))
join avyantra_dev.patient_baby_investigations i on
    (((a.id = i.study_id)
    and (d.reading = i.reading))))
join avyantra_dev.patient_infos j on
    ((a.id = j.study_id)))
    where a.baby_medical_record_number = '${baby_record}'
    and d.reading = '${reading}'
`, {
    });
    res.json({ results });

};

module.exports = babyRecordAsha;




