const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const babyDetailsToCsv = async (req, res) => {
    let asha = req.query.asha;
    let fromDate = req.query.from_date;
    let toDate = req.query.to_date;
    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);

    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: { email: mail } });

    var userId = user.user_id;
    console.log(fromDate)
    if (asha == 2) {
        if (fromDate == undefined && toDate == undefined) {
            console.log("Nooooooooooooo Frommmmmmmmmmmmmmmmmmmmmmmm")
            const [results, metadata] = await sequelize.query(`select distinct
            --     a.id AS id,
                a.baby_medical_record_number AS baby_medical_record_number,
                a.hospital_name AS hospital_name,
                a.hospital_branch_name AS hospital_branch_name,
                a.id AS study_id,
                a.baby_mother_medical_record_number AS baby_mother_medical_record_number,
                b.record_type AS record_type,
                b.baby_admission_type AS baby_admission_type,
                b.baby_birth_date AS baby_birth_date,
                b.baby_place_of_birth_pin_code AS baby_place_of_birth_pin_code,
                b.baby_place_of_birth_name AS baby_place_of_birth_name,
                b.baby_birth_time_hours AS baby_birth_time_hours,
                b.baby_birth_time_minit AS baby_birth_time_minit,
                b.baby_age_of_admission AS baby_age_of_admission,
                b.baby_apgar_score_one_min AS baby_apgar_score_one_min,
                b.baby_apgar_score_five_min AS baby_apgar_score_five_min,
                b.baby_apgar_score_ten_min AS baby_apgar_score_ten_min,
                b.baby_preterm AS baby_preterm,
                b.baby_condition_yes_eos_los AS baby_condition_yes_eos_los,
                b.baby_condition_rds_yes_no AS baby_condition_rds_yes_no,
                b.baby_gender AS baby_gender,
                b.baby_condition_jaundice_suspect AS baby_condition_jaundice_suspect,
                b.baby_condition_ttnb_suspect AS baby_condition_ttnb_suspect,
                b.baby_condition_lga_suspect AS baby_condition_lga_suspect,
                b.baby_condition_aga_suspect AS baby_condition_aga_suspect,
                b.baby_condition_sga_suspect AS baby_condition_sga_suspect,
                b.baby_shock_aga_suspect AS baby_shock_aga_suspect,
                b.baby_condition_dextrocordia_suspect AS baby_condition_dextrocordia_suspect,
                b.baby_condition_anemia_suspect AS baby_condition_anemia_suspect,
                b.baby_condition_lbw_suspect AS baby_condition_lbw_suspect,
                b.place_of_delivery AS place_of_delivery,
                b.birth_facility AS birth_facility,
                b.baby_gestational_age AS baby_gestational_age,
                b.baby_gestational_age_unit AS baby_gestational_age_unit,
                b.baby_weight_at_birth AS baby_weight_at_birth,
                b.baby_condition_suspect AS baby_condition_suspect,
                b.baby_day_of_event AS baby_day_of_event,
                b.baby_weight_at_admission AS baby_weight_at_admission,
                b.baby_condition_other_if_suspect AS baby_condition_other_if_suspect,
                b.prelim_diagnosis_perinatal AS prelim_diagnosis_perinatal,
                b.prelim_diagnosis_hypoglycemia AS prelim_diagnosis_hypoglycemia,
                b.prelim_diagnosis_hypocalcemia AS prelim_diagnosis_hypocalcemia,
                b.prelim_diagnosis_feeding_intolerence AS prelim_diagnosis_feeding_intolerence,
                b.prelim_diagnosis_gastroenteritis AS prelim_diagnosis_gastroenteritis,
                b.baby_weight_at_birth_unit AS baby_weight_at_birth_unit,
                b.baby_weight_at_admission_unit AS baby_weight_at_admission_unit,
                b.baby_date_of_admission AS baby_date_of_admission,
                c.mother_weight_unit AS mother_weight_unit,
                c.mother_weight AS mother_weight,
                c.mother_height AS mother_height,
                c.mother_height_unit AS mother_height_unit,
                c.mother_haemoglobin AS mother_haemoglobin,
                c.mother_bmi AS mother_bmi,
                c.maternal_blood_pressure AS maternal_blood_pressure,
                c.maternal_blood_pressure_diastolic AS maternal_blood_pressure_diastolic,
                c.maternal_diabetes AS maternal_diabetes,
                c.maternal_fever AS maternal_fever,
                c.maternal_fever_unit AS maternal_fever_unit,
                c.maternal_fever_basic AS maternal_fever_basic,
                c.maternal_thyroid_function AS maternal_thyroid_function,
                c.maternal_thyroid_function_basic AS maternal_thyroid_function_basic,
                c.maternal_thyroid_function_unit_basic AS maternal_thyroid_function_unit_basic,
                c.maternal_thyroid_function_unit_basic_unit AS maternal_thyroid_function_unit_basic_unit,
                c.more_than_3_vaginal_examinations_during_labor AS more_than_3_vaginal_examinations_during_labor,
                c.rupture_of_membranes_rom_one AS rupture_of_membranes_rom_one,
                c.leaking_pv AS leaking_pv,
                c.rupture_of_membranes_rom AS rupture_of_membranes_rom,
                c.smelly_amniotic_fluid AS smelly_amniotic_fluid,
                c.chorioamnionitis AS chorioamnionitis,
                c.gbs_infection AS gbs_infection,
                c.colonisation_or_urinary_tract_infection AS colonisation_or_urinary_tract_infection,
                c.torch_infections AS torch_infections,
                c.type_of_delivery AS type_of_delivery,
                c.delayed_cord_clamping AS delayed_cord_clamping,
                c.vaginal_swab_culture_two AS vaginal_swab_culture_two,
                c.vaginal_swab_culture_three AS vaginal_swab_culture_three,
                c.amniotic_fluid_culture AS amniotic_fluid_culture,
                c.amniotic_fluid_culture_three AS amniotic_fluid_culture_three,
                c.amniotic_fluid_culture_two AS amniotic_fluid_culture_two,
                c.rupture_of_membranes_rom_two AS rupture_of_membranes_rom_two,
                c.vaginal_swab_culture AS vaginal_swab_culture,
                c.mother_age AS mother_age,
                d.baby_appearance AS baby_appearance,
                d.baby_skin_colour AS baby_skin_colour,
                d.baby_cry_sound AS baby_cry_sound,
                d.baby_cry_sound_status AS baby_cry_sound_status,
                d.hypotonia_muscular_response_one_min_after_birth AS hypotonia_muscular_response_one_min_after_birth,
                d.hypotonia_muscular_response_five_min_after_birth AS hypotonia_muscular_response_five_min_after_birth,
                d.excessive_sleeping AS excessive_sleeping,
                d.hypothermia AS hypothermia,
                d.hypothermia_status_value AS hypothermia_status_value,
                d.baby_feeding_status AS baby_feeding_status,
                d.baby_presence_of_convulsions AS baby_presence_of_convulsions,
                d.baby_jaundice AS baby_jaundice,
                d.breast_feeding_initiation AS breast_feeding_initiation,
                d.kangaroo_mother_care AS kangaroo_mother_care,
                d.hypothermia_status AS hypothermia_status,
                d.baby_weight_at_birth AS baby_weight_at_birth_baby_appearance,
                d.baby_weight_at_birth_unit AS baby_weight_at_birth_unit_baby_appearance,
                d.umbilical_discharge AS umbilical_discharge,
                e.groaning AS groaning,
                e.grunting AS grunting,
                e.stridor AS stridor,
                e.retraction AS retraction,
                e.fast_breathing AS fast_breathing,
                e.oxygen_saturation AS oxygen_saturation,
                e.breathing_rate AS breathing_rate,
                e.baby_chest_indrawing AS baby_chest_indrawing,
                e.x_ray_status_done AS x_ray_status_done,
                e.x_ray_result AS x_ray_result,
                e.x_ray_diagnosis_any_other AS x_ray_diagnosis_any_other,
                e.x_ray_status AS x_ray_status,
                e.apnea_status AS apnea_status,
                e.apnea_diagnosis AS apnea_diagnosis,
                e.baby_respiratory_support AS baby_respiratory_support,
                e.baby_respiratory_support_if_yes AS baby_respiratory_support_if_yes,
                f.heart_rate AS heart_rate,
                f.urine_output AS urine_output,
                f.baby_blood_pressure_mean_arterial_bp AS baby_blood_pressure_mean_arterial_bp,
                f.baby_blood_pressure_upper_limb AS baby_blood_pressure_upper_limb,
                f.baby_blood_pressure_lower_limb AS baby_blood_pressure_lower_limb,
                f.capillary_refill_unit AS capillary_refill_unit,
                f.low_peripheral_pulse_volume AS low_peripheral_pulse_volume,
                f.cool_peripheries AS cool_peripheries,
                f.two_d_echo_done AS two_d_echo_done,
                f.two_d_echo_done_if_yes AS two_d_echo_done_if_yes,
                f.baby_on_ionotropes AS baby_on_ionotropes,
                f.central_line AS central_line,
                f.skin_pustules AS skin_pustules,
                f.infusion_of_blood_products AS infusion_of_blood_products,
                g.features_of_encephalopathy AS features_of_encephalopathy,
                g.seizures AS seizures,
                g.abnormal_movements_like_tonic_posturing AS abnormal_movements_like_tonic_posturing,
                g.af_bulge AS af_bulge,
                h.abdominal_dystension AS abdominal_dystension,
                h.frequency_of_stools AS frequency_of_stools,
                h.diarrhea AS diarrhea,
                h.vomiting AS vomiting,
                h.feeding_intolerance AS feeding_intolerance,
                h.baby_movement AS baby_movement,
                i.baby_thyroid_status AS baby_thyroid_status,
                i.baby_thyroid_result AS baby_thyroid_result,
                i.baby_blood_glucose AS baby_blood_glucose,
                i.baby_haemoglobin_levels AS baby_haemoglobin_levels,
                i.baby_c_reactive_protien_levels AS baby_c_reactive_protien_levels,
                i.micro_esr AS micro_esr,
                i.baby_procalcitonin_levels AS baby_procalcitonin_levels,
                i.total_leucocute_count_unit AS total_leucocute_count_unit,
                i.total_leucocute_count AS total_leucocute_count,
                i.absolute_neutrophil_count AS absolute_neutrophil_count,
                i.absolute_neutrophil_count_unit AS absolute_neutrophil_count_unit,
                i.immature_to_mature_neutrophil_ratios AS immature_to_mature_neutrophil_ratios,
                i.thrombocytopenia_unit AS thrombocytopenia_unit,
                i.thrombocytopenia AS thrombocytopenia,
                i.urine_rest_for_pus_cells AS urine_rest_for_pus_cells,
                i.urine_culture_test AS urine_culture_test,
                i.blood_culture_report AS blood_culture_report,
                i.gram_positive_bacteria AS gram_positive_bacteria,
                i.gram_positive_bacteria_if_other AS gram_positive_bacteria_if_other,
                i.gram_negative_bacteria AS gram_negative_bacteria,
                i.gram_negative_bacteria_if_other AS gram_negative_bacteria_if_other,
                i.fungi AS fungi,
                i.other_organism AS other_organism,
                i.antibiotic_status_resisitant AS antibiotic_status_resisitant,
                i.antibiotic_status_intermediate AS antibiotic_status_intermediate,
                i.sodium AS sodium,
                i.potassium AS potassium,
                i.chlorine AS chlorine,
                i.calcium AS calcium,
                i.phosphate AS phosphate,
                i.magnesium AS magnesium,
                i.urea AS urea,
                i.creatinine AS creatinine,
                i.lactate_levels AS lactate_levels,
                i.bilirubin_levels AS bilirubin_levels,
                i.cord_ph AS cord_ph,
                i.arrhythmia AS arrhythmia,
                i.csf_culture AS csf_culture,
                i.csf_culture_tsb_value AS csf_culture_tsb_value,
                i.antibiotic_status_value AS antibiotic_status_value,
                j.antibiotic_given AS antibiotic_given,
                j.date_of_administration_of_antiobiotic AS date_of_administration_of_antiobiotic,
                j.time_of_administration_of_antiobiotic_hours AS time_of_administration_of_antiobiotic_hours,
                j.time_of_administration_of_antiobiotic_minute AS time_of_administration_of_antiobiotic_minute,
                j.antibiotic_name AS antibiotic_name,
                j.antibiotic_name_if_other AS antibiotic_name_if_other,
                j.grade_of_antibiotic AS grade_of_antibiotic,
                j.date_of_blood_samples_sent_for_culture_test AS date_of_blood_samples_sent_for_culture_test,
                j.time_of_blood_samples_sent_for_culture_test_hours AS time_of_blood_samples_sent_for_culture_test_hours,
                j.time_of_blood_samples_sent_for_culture_test_minute AS time_of_blood_samples_sent_for_culture_test_minute,
                j.blood_sample_taken_prior_to_antiobiotic_administration AS blood_sample_taken_prior_to_antiobiotic_administration,
                k.days_of_stay_in_hospital AS days_of_stay_in_hospital,
                k.final_diagnosis_sepsis AS final_diagnosis_sepsis,
                k.final_diagnosis_rds AS final_diagnosis_rds,
                k.final_diagnosis_ttnb AS final_diagnosis_ttnb,
                k.final_diagnosis_jaundice AS final_diagnosis_jaundice,
                k.final_diagnosis_lbw AS final_diagnosis_lbw,
                k.final_diagnosis_lga AS final_diagnosis_lga,
                k.final_diagnosis_aga AS final_diagnosis_aga,
                k.final_diagnosis_sga AS final_diagnosis_sga,
                k.final_diagnosis_anemia AS final_diagnosis_anemia,
                k.final_diagnosis_dextochordia AS final_diagnosis_dextochordia,
                k.final_diagnosis_hypoglycemia AS final_diagnosis_hypoglycemia,
                k.final_diagnosis_hypocalcemia AS final_diagnosis_hypocalcemia,
                k.final_diagnosis_gastroenteritis AS final_diagnosis_gastroenteritis,
                k.final_diagnosis_perinatal_respiratory_depression AS final_diagnosis_perinatal_respiratory_depression,
                k.final_diagnosis_shock AS final_diagnosis_shock,
                k.final_diagnosis_feeding_intolerence AS final_diagnosis_feeding_intolerence,
                k.baby_discharge_date AS baby_discharge_date,
                k.final_diagnosis_eos_los AS final_diagnosis_eos_los,
                k.final_diagnosis_other AS final_diagnosis_other,
                d.reading AS reading,
                d.reading_date AS reading_date,
                d.createdAt AS createdAt,
                d.time_of_reading_hours AS time_of_reading_hours,
                d.time_of_reading_minute AS time_of_reading_minute
            from
                ((((((((((avyantra_dev.patient_basic_infos a
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
            join avyantra_dev.patient_baby_cns_infos g on
                (((a.id = g.study_id)
                and (d.reading = g.reading))))
            join avyantra_dev.patient_baby_git_infos h on
                (((a.id = h.study_id)
                and (d.reading = h.reading))))
            join avyantra_dev.patient_baby_investigations i on
                (((a.id = i.study_id)
                and (d.reading = i.reading))))
            join avyantra_dev.patient_baby_antibiotics j on
                (((a.id = j.study_id)
                and (d.reading = j.reading))))
            join avyantra_dev.patient_baby_finals k on
                (((a.id = k.study_id)
                and (d.reading = k.reading))))
            join avyantra_dev.dashboard_users l on
                l.hospital_id = a.hospital_id
                where l.user_id = '${userId}' 
            order by
                a.hospital_name,
                a.hospital_branch_name,
                a.baby_medical_record_number,
                d.createdAt`, {
            });
            res.json({ results });
        }

        else {
            console.log("frommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
            const [results, metadata] = await sequelize.query(`select distinct
        --     a.id AS id,
            a.baby_medical_record_number AS baby_medical_record_number,
            a.hospital_name AS hospital_name,
            a.hospital_branch_name AS hospital_branch_name,
            a.id AS study_id,
            a.baby_mother_medical_record_number AS baby_mother_medical_record_number,
            b.record_type AS record_type,
            b.baby_admission_type AS baby_admission_type,
            b.baby_birth_date AS baby_birth_date,
            b.baby_place_of_birth_pin_code AS baby_place_of_birth_pin_code,
            b.baby_place_of_birth_name AS baby_place_of_birth_name,
            b.baby_birth_time_hours AS baby_birth_time_hours,
            b.baby_birth_time_minit AS baby_birth_time_minit,
            b.baby_age_of_admission AS baby_age_of_admission,
            b.baby_apgar_score_one_min AS baby_apgar_score_one_min,
            b.baby_apgar_score_five_min AS baby_apgar_score_five_min,
            b.baby_apgar_score_ten_min AS baby_apgar_score_ten_min,
            b.baby_preterm AS baby_preterm,
            b.baby_condition_yes_eos_los AS baby_condition_yes_eos_los,
            b.baby_condition_rds_yes_no AS baby_condition_rds_yes_no,
            b.baby_gender AS baby_gender,
            b.baby_condition_jaundice_suspect AS baby_condition_jaundice_suspect,
            b.baby_condition_ttnb_suspect AS baby_condition_ttnb_suspect,
            b.baby_condition_lga_suspect AS baby_condition_lga_suspect,
            b.baby_condition_aga_suspect AS baby_condition_aga_suspect,
            b.baby_condition_sga_suspect AS baby_condition_sga_suspect,
            b.baby_shock_aga_suspect AS baby_shock_aga_suspect,
            b.baby_condition_dextrocordia_suspect AS baby_condition_dextrocordia_suspect,
            b.baby_condition_anemia_suspect AS baby_condition_anemia_suspect,
            b.baby_condition_lbw_suspect AS baby_condition_lbw_suspect,
            b.place_of_delivery AS place_of_delivery,
            b.birth_facility AS birth_facility,
            b.baby_gestational_age AS baby_gestational_age,
            b.baby_gestational_age_unit AS baby_gestational_age_unit,
            b.baby_weight_at_birth AS baby_weight_at_birth,
            b.baby_condition_suspect AS baby_condition_suspect,
            b.baby_day_of_event AS baby_day_of_event,
            b.baby_weight_at_admission AS baby_weight_at_admission,
            b.baby_condition_other_if_suspect AS baby_condition_other_if_suspect,
            b.prelim_diagnosis_perinatal AS prelim_diagnosis_perinatal,
            b.prelim_diagnosis_hypoglycemia AS prelim_diagnosis_hypoglycemia,
            b.prelim_diagnosis_hypocalcemia AS prelim_diagnosis_hypocalcemia,
            b.prelim_diagnosis_feeding_intolerence AS prelim_diagnosis_feeding_intolerence,
            b.prelim_diagnosis_gastroenteritis AS prelim_diagnosis_gastroenteritis,
            b.baby_weight_at_birth_unit AS baby_weight_at_birth_unit,
            b.baby_weight_at_admission_unit AS baby_weight_at_admission_unit,
            b.baby_date_of_admission AS baby_date_of_admission,
            c.mother_weight_unit AS mother_weight_unit,
            c.mother_weight AS mother_weight,
            c.mother_height AS mother_height,
            c.mother_height_unit AS mother_height_unit,
            c.mother_haemoglobin AS mother_haemoglobin,
            c.mother_bmi AS mother_bmi,
            c.maternal_blood_pressure AS maternal_blood_pressure,
            c.maternal_blood_pressure_diastolic AS maternal_blood_pressure_diastolic,
            c.maternal_diabetes AS maternal_diabetes,
            c.maternal_fever AS maternal_fever,
            c.maternal_fever_unit AS maternal_fever_unit,
            c.maternal_fever_basic AS maternal_fever_basic,
            c.maternal_thyroid_function AS maternal_thyroid_function,
            c.maternal_thyroid_function_basic AS maternal_thyroid_function_basic,
            c.maternal_thyroid_function_unit_basic AS maternal_thyroid_function_unit_basic,
            c.maternal_thyroid_function_unit_basic_unit AS maternal_thyroid_function_unit_basic_unit,
            c.more_than_3_vaginal_examinations_during_labor AS more_than_3_vaginal_examinations_during_labor,
            c.rupture_of_membranes_rom_one AS rupture_of_membranes_rom_one,
            c.leaking_pv AS leaking_pv,
            c.rupture_of_membranes_rom AS rupture_of_membranes_rom,
            c.smelly_amniotic_fluid AS smelly_amniotic_fluid,
            c.chorioamnionitis AS chorioamnionitis,
            c.gbs_infection AS gbs_infection,
            c.colonisation_or_urinary_tract_infection AS colonisation_or_urinary_tract_infection,
            c.torch_infections AS torch_infections,
            c.type_of_delivery AS type_of_delivery,
            c.delayed_cord_clamping AS delayed_cord_clamping,
            c.vaginal_swab_culture_two AS vaginal_swab_culture_two,
            c.vaginal_swab_culture_three AS vaginal_swab_culture_three,
            c.amniotic_fluid_culture AS amniotic_fluid_culture,
            c.amniotic_fluid_culture_three AS amniotic_fluid_culture_three,
            c.amniotic_fluid_culture_two AS amniotic_fluid_culture_two,
            c.rupture_of_membranes_rom_two AS rupture_of_membranes_rom_two,
            c.vaginal_swab_culture AS vaginal_swab_culture,
            c.mother_age AS mother_age,
            d.baby_appearance AS baby_appearance,
            d.baby_skin_colour AS baby_skin_colour,
            d.baby_cry_sound AS baby_cry_sound,
            d.baby_cry_sound_status AS baby_cry_sound_status,
            d.hypotonia_muscular_response_one_min_after_birth AS hypotonia_muscular_response_one_min_after_birth,
            d.hypotonia_muscular_response_five_min_after_birth AS hypotonia_muscular_response_five_min_after_birth,
            d.excessive_sleeping AS excessive_sleeping,
            d.hypothermia AS hypothermia,
            d.hypothermia_status_value AS hypothermia_status_value,
            d.baby_feeding_status AS baby_feeding_status,
            d.baby_presence_of_convulsions AS baby_presence_of_convulsions,
            d.baby_jaundice AS baby_jaundice,
            d.breast_feeding_initiation AS breast_feeding_initiation,
            d.kangaroo_mother_care AS kangaroo_mother_care,
            d.hypothermia_status AS hypothermia_status,
            d.baby_weight_at_birth AS baby_weight_at_birth_baby_appearance,
            d.baby_weight_at_birth_unit AS baby_weight_at_birth_unit_baby_appearance,
            d.umbilical_discharge AS umbilical_discharge,
            e.groaning AS groaning,
            e.grunting AS grunting,
            e.stridor AS stridor,
            e.retraction AS retraction,
            e.fast_breathing AS fast_breathing,
            e.oxygen_saturation AS oxygen_saturation,
            e.breathing_rate AS breathing_rate,
            e.baby_chest_indrawing AS baby_chest_indrawing,
            e.x_ray_status_done AS x_ray_status_done,
            e.x_ray_result AS x_ray_result,
            e.x_ray_diagnosis_any_other AS x_ray_diagnosis_any_other,
            e.x_ray_status AS x_ray_status,
            e.apnea_status AS apnea_status,
            e.apnea_diagnosis AS apnea_diagnosis,
            e.baby_respiratory_support AS baby_respiratory_support,
            e.baby_respiratory_support_if_yes AS baby_respiratory_support_if_yes,
            f.heart_rate AS heart_rate,
            f.urine_output AS urine_output,
            f.baby_blood_pressure_mean_arterial_bp AS baby_blood_pressure_mean_arterial_bp,
            f.baby_blood_pressure_upper_limb AS baby_blood_pressure_upper_limb,
            f.baby_blood_pressure_lower_limb AS baby_blood_pressure_lower_limb,
            f.capillary_refill_unit AS capillary_refill_unit,
            f.low_peripheral_pulse_volume AS low_peripheral_pulse_volume,
            f.cool_peripheries AS cool_peripheries,
            f.two_d_echo_done AS two_d_echo_done,
            f.two_d_echo_done_if_yes AS two_d_echo_done_if_yes,
            f.baby_on_ionotropes AS baby_on_ionotropes,
            f.central_line AS central_line,
            f.skin_pustules AS skin_pustules,
            f.infusion_of_blood_products AS infusion_of_blood_products,
            g.features_of_encephalopathy AS features_of_encephalopathy,
            g.seizures AS seizures,
            g.abnormal_movements_like_tonic_posturing AS abnormal_movements_like_tonic_posturing,
            g.af_bulge AS af_bulge,
            h.abdominal_dystension AS abdominal_dystension,
            h.frequency_of_stools AS frequency_of_stools,
            h.diarrhea AS diarrhea,
            h.vomiting AS vomiting,
            h.feeding_intolerance AS feeding_intolerance,
            h.baby_movement AS baby_movement,
            i.baby_thyroid_status AS baby_thyroid_status,
            i.baby_thyroid_result AS baby_thyroid_result,
            i.baby_blood_glucose AS baby_blood_glucose,
            i.baby_haemoglobin_levels AS baby_haemoglobin_levels,
            i.baby_c_reactive_protien_levels AS baby_c_reactive_protien_levels,
            i.micro_esr AS micro_esr,
            i.baby_procalcitonin_levels AS baby_procalcitonin_levels,
            i.total_leucocute_count_unit AS total_leucocute_count_unit,
            i.total_leucocute_count AS total_leucocute_count,
            i.absolute_neutrophil_count AS absolute_neutrophil_count,
            i.absolute_neutrophil_count_unit AS absolute_neutrophil_count_unit,
            i.immature_to_mature_neutrophil_ratios AS immature_to_mature_neutrophil_ratios,
            i.thrombocytopenia_unit AS thrombocytopenia_unit,
            i.thrombocytopenia AS thrombocytopenia,
            i.urine_rest_for_pus_cells AS urine_rest_for_pus_cells,
            i.urine_culture_test AS urine_culture_test,
            i.blood_culture_report AS blood_culture_report,
            i.gram_positive_bacteria AS gram_positive_bacteria,
            i.gram_positive_bacteria_if_other AS gram_positive_bacteria_if_other,
            i.gram_negative_bacteria AS gram_negative_bacteria,
            i.gram_negative_bacteria_if_other AS gram_negative_bacteria_if_other,
            i.fungi AS fungi,
            i.other_organism AS other_organism,
            i.antibiotic_status_resisitant AS antibiotic_status_resisitant,
            i.antibiotic_status_intermediate AS antibiotic_status_intermediate,
            i.sodium AS sodium,
            i.potassium AS potassium,
            i.chlorine AS chlorine,
            i.calcium AS calcium,
            i.phosphate AS phosphate,
            i.magnesium AS magnesium,
            i.urea AS urea,
            i.creatinine AS creatinine,
            i.lactate_levels AS lactate_levels,
            i.bilirubin_levels AS bilirubin_levels,
            i.cord_ph AS cord_ph,
            i.arrhythmia AS arrhythmia,
            i.csf_culture AS csf_culture,
            i.csf_culture_tsb_value AS csf_culture_tsb_value,
            i.antibiotic_status_value AS antibiotic_status_value,
            j.antibiotic_given AS antibiotic_given,
            j.date_of_administration_of_antiobiotic AS date_of_administration_of_antiobiotic,
            j.time_of_administration_of_antiobiotic_hours AS time_of_administration_of_antiobiotic_hours,
            j.time_of_administration_of_antiobiotic_minute AS time_of_administration_of_antiobiotic_minute,
            j.antibiotic_name AS antibiotic_name,
            j.antibiotic_name_if_other AS antibiotic_name_if_other,
            j.grade_of_antibiotic AS grade_of_antibiotic,
            j.date_of_blood_samples_sent_for_culture_test AS date_of_blood_samples_sent_for_culture_test,
            j.time_of_blood_samples_sent_for_culture_test_hours AS time_of_blood_samples_sent_for_culture_test_hours,
            j.time_of_blood_samples_sent_for_culture_test_minute AS time_of_blood_samples_sent_for_culture_test_minute,
            j.blood_sample_taken_prior_to_antiobiotic_administration AS blood_sample_taken_prior_to_antiobiotic_administration,
            k.days_of_stay_in_hospital AS days_of_stay_in_hospital,
            k.final_diagnosis_sepsis AS final_diagnosis_sepsis,
            k.final_diagnosis_rds AS final_diagnosis_rds,
            k.final_diagnosis_ttnb AS final_diagnosis_ttnb,
            k.final_diagnosis_jaundice AS final_diagnosis_jaundice,
            k.final_diagnosis_lbw AS final_diagnosis_lbw,
            k.final_diagnosis_lga AS final_diagnosis_lga,
            k.final_diagnosis_aga AS final_diagnosis_aga,
            k.final_diagnosis_sga AS final_diagnosis_sga,
            k.final_diagnosis_anemia AS final_diagnosis_anemia,
            k.final_diagnosis_dextochordia AS final_diagnosis_dextochordia,
            k.final_diagnosis_hypoglycemia AS final_diagnosis_hypoglycemia,
            k.final_diagnosis_hypocalcemia AS final_diagnosis_hypocalcemia,
            k.final_diagnosis_gastroenteritis AS final_diagnosis_gastroenteritis,
            k.final_diagnosis_perinatal_respiratory_depression AS final_diagnosis_perinatal_respiratory_depression,
            k.final_diagnosis_shock AS final_diagnosis_shock,
            k.final_diagnosis_feeding_intolerence AS final_diagnosis_feeding_intolerence,
            k.baby_discharge_date AS baby_discharge_date,
            k.final_diagnosis_eos_los AS final_diagnosis_eos_los,
            k.final_diagnosis_other AS final_diagnosis_other,
            d.reading AS reading,
            d.reading_date AS reading_date,
            d.createdAt AS createdAt,
            d.time_of_reading_hours AS time_of_reading_hours,
            d.time_of_reading_minute AS time_of_reading_minute
        from
            ((((((((((avyantra_dev.patient_basic_infos a
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
        join avyantra_dev.patient_baby_cns_infos g on
            (((a.id = g.study_id)
            and (d.reading = g.reading))))
        join avyantra_dev.patient_baby_git_infos h on
            (((a.id = h.study_id)
            and (d.reading = h.reading))))
        join avyantra_dev.patient_baby_investigations i on
            (((a.id = i.study_id)
            and (d.reading = i.reading))))
        join avyantra_dev.patient_baby_antibiotics j on
            (((a.id = j.study_id)
            and (d.reading = j.reading))))
        join avyantra_dev.patient_baby_finals k on
            (((a.id = k.study_id)
            and (d.reading = k.reading))))
        join avyantra_dev.dashboard_users l on
            l.hospital_id = a.hospital_id
            where l.user_id = '${userId}' and
            str_to_date(b.baby_date_of_admission , '%d/%m/%Y') between '${fromDate}' and '${toDate}'
        order by
            a.hospital_name,
            a.hospital_branch_name,
            a.baby_medical_record_number,
            d.createdAt`, {
            });
            res.json({ results });
        }
    } else if (asha == 1) {
        if(fromDate == undefined && toDate == undefined) {
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
        join avyantra_dev.dashboard_users l on
                        l.hospital_id = a.hospital_id
                        where l.user_id = '${userId}' `, {
            });
          
             res.json({ results });

        } else {
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
        join avyantra_dev.dashboard_users l on
                        l.hospital_id = a.hospital_id
                        where l.user_id = where l.user_id = '${userId}' and
                        str_to_date(b.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}' `, {
            });
          
             res.json({ results });

        }

    }

};

module.exports = babyDetailsToCsv;



