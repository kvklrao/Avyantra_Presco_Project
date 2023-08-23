# coding: utf-8


import pandas as pd
import numpy as np
import profile
import joblib
import pickle
import os
import time

from decimal import Decimal, ROUND_HALF_EVEN
from flask import Flask, render_template, request, send_from_directory, jsonify
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import LabelEncoder
from sklearn.compose import ColumnTransformer
from flask_cors import CORS, cross_origin 
from lightgbm import LGBMClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.feature_selection import RFE
from sklearn.metrics import accuracy_score
from imblearn.over_sampling import RandomOverSampler
from sklearn.model_selection import train_test_split
from sklearn.impute import KNNImputer
from sklearn.pipeline import Pipeline
from numpy.random import randint
from waitress import serve
from itertools import *
import joblib
import re


app = Flask(__name__)
cors = CORS(app,resource={r'/getuser/*':{'origins': '*'}}) #Change the * with react endpoint for restricted access




@app.route("/", methods=['POST'])
def home():
    return (str("Application Running..."))
    
    



@app.route('/getscore', methods=['GET','POST'])
@cross_origin(origins = ['*'],headers=['access-control-allow-origin','Content-Type'])
def form():
    if request.method == "POST":
    
        #Create dataframe of arguments
        #Replace erratic values with original values of Model
        #removing leading and trailing spaces
        d = request.form.to_dict()
        df_args = pd.DataFrame([d.values()], columns=d.keys())
        df_args = df_args.drop(['study_id'],axis=1)
        df_args = df_args.replace(r'\s+', '', regex=True)
        df_args = df_args.replace('(?i)na', 'NA', regex=True).replace('(?i)nan','NA', regex=True).replace('','NA',regex=True)
        df_args = df_args.replace('(?i)yes', 'Yes',regex=True).replace('(?i)no', 'No',regex=True)
        df_args = df_args.replace(r"^ +| +$", r"", regex=True) 
        df_args = df_args.replace('AcrocyaNosis','Acrocyanosis').replace('PeripheralDuskiness','Peripheral Duskiness').replace('CentralCyanosis','Central Cyanosis')
        df_args = df_args.replace('LowPitch','Low Pitch').replace('HighPitch','HighPitch').replace('HighPitch','High Pitch').replace('NotCried','Not Cried')
        df_args = df_args.replace('NoFeeding','No Feeding').replace('noFeeding','No Feeding').replace('nOFeeding','No Feeding')
        df_args = df_args.replace('AbNormal','Abnormal')
        df_args = df_args.replace('<3Sec','< 3 Sec').replace('>3Sec','> 3 Sec').replace('=0Sec','= 0 Sec').replace('=3Sec','= 3 Sec')
        df_args = df_args.replace('<18hours','<18 hours').replace('>18hours','>18 hours')


        #Input validations for Numerical Columns
        if( (df_args['baby_apgar_score_one_min'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_apgar_score_one_min'][0])):
                        if((float(df_args['baby_apgar_score_one_min'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_apgar_score_one_min'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_apgar_score_one_min'))
        
       
        if( (df_args['baby_apgar_score_five_min'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_apgar_score_five_min'][0])):
                        if((float(df_args['baby_apgar_score_five_min'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_apgar_score_five_min'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_apgar_score_five_min'))
        
        
        if( (df_args['baby_apgar_score_ten_min'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_apgar_score_ten_min'][0])):
                        if((float(df_args['baby_apgar_score_ten_min'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_apgar_score_ten_min'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_apgar_score_ten_min'))
        
        if( (df_args['baby_weight_at_birth'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_weight_at_birth'][0])):
                        if((float(df_args['baby_weight_at_birth'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_weight_at_birth'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_weight_at_birth'))
        
        if( (df_args['baby_cry_sound_status'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_cry_sound_status'][0])):
                        if((float(df_args['baby_cry_sound_status'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_cry_sound_status'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_cry_sound_status'))
       
       
        if( (df_args['maternal_blood_pressure'][0] != 'NA') ):
                try:
                    if(float(df_args['maternal_blood_pressure'][0])):
                        if((float(df_args['maternal_blood_pressure'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for maternal_blood_pressure'))
                except ValueError as e:
                    return (str('Please Enter Number for maternal_blood_pressure'))
       
        if( (df_args['maternal_blood_pressure_diastolic'][0] != 'NA') ):
                try:
                    if(float(df_args['maternal_blood_pressure_diastolic'][0])):
                        if((float(df_args['maternal_blood_pressure_diastolic'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for maternal_blood_pressure_diastolic'))
                except ValueError as e:
                    return (str('Please Enter Number for maternal_blood_pressure_diastolic'))
        
        if( (df_args['heart_rate'][0] != 'NA') ):
                try:
                    if(float(df_args['heart_rate'][0])):
                        if((float(df_args['heart_rate'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for heart_rate'))
                except ValueError as e:
                    return (str('Please Enter Number for heart_rate'))
        
        if( (df_args['baby_blood_pressure_mean_arterial_bp'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_blood_pressure_mean_arterial_bp'][0])):
                        if((float(df_args['baby_blood_pressure_mean_arterial_bp'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_blood_pressure_mean_arterial_bp'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_blood_pressure_mean_arterial_bp'))

        
        if( (df_args['frequency_of_stools'][0] != 'NA') ):
                try:
                    if(float(df_args['frequency_of_stools'][0])):
                        if((float(df_args['frequency_of_stools'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for frequency_of_stools'))
                except ValueError as e:
                    return (str('Please Enter Number for frequency_of_stools'))
        
        
        if( (df_args['baby_thyroid_result'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_thyroid_result'][0])):
                        if((float(df_args['baby_thyroid_result'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_thyroid_result'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_thyroid_result'))
        
        if( (df_args['thrombocytopenia'][0] != 'NA') ):
                try:
                    if(float(df_args['thrombocytopenia'][0])):
                        if((float(df_args['thrombocytopenia'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for thrombocytopenia'))
                except ValueError as e:
                    return (str('Please Enter Number for thrombocytopenia'))
        
        if( (df_args['baby_gestational_age'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_gestational_age'][0])):
                        if((float(df_args['baby_gestational_age'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_gestational_age'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_gestational_age'))
        
        if( (df_args['baby_weight_at_admission'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_weight_at_admission'][0])):
                        if((float(df_args['baby_weight_at_admission'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_weight_at_admission'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_weight_at_admission'))
        
        
        if( (df_args['baby_blood_glucose'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_blood_glucose'][0])):
                        if((float(df_args['baby_blood_glucose'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_blood_glucose'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_blood_glucose'))
        
        if( (df_args['baby_haemoglobin_levels'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_haemoglobin_levels'][0])):
                        if((float(df_args['baby_haemoglobin_levels'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_haemoglobin_levels'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_haemoglobin_levels'))
                    
        
        if( (df_args['baby_c_reactive_protien_levels'][0] != 'NA') ):
                try:
                    if(float(df_args['baby_c_reactive_protien_levels'][0])):
                        if((float(df_args['baby_c_reactive_protien_levels'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_c_reactive_protien_levels'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_c_reactive_protien_levels'))
                    
        if( (df_args['total_leucocute_count'][0] != 'NA') ):
                try:
                    if(float(df_args['total_leucocute_count'][0])):
                        if((float(df_args['total_leucocute_count'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for total_leucocute_count'))
                except ValueError as e:
                    return (str('Please Enter Number for total_leucocute_count'))
        
        if( (df_args['potassium'][0] != 'NA') ):
                try:
                    if(float(df_args['potassium'][0])):
                        if((float(df_args['potassium'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for potassium'))
                except ValueError as e:
                    return (str('Please Enter Number for potassium'))
        
        if( (df_args['chlorine'][0] != 'NA') ):
                try:
                    if(float(df_args['chlorine'][0])):
                        if((float(df_args['chlorine'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for chlorine'))
                except ValueError as e:
                    return (str('Please Enter Number for chlorine'))
        
        if( (df_args['phosphate'][0] != 'NA') ):
                try:
                    if(float(df_args['phosphate'][0])):
                        if((float(df_args['phosphate'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for phosphate'))
                except ValueError as e:
                    return (str('Please Enter Number for phosphate'))
        
        
        if( (df_args['bilirubin levels'][0] != 'NA') ):
                try:
                    if(float(df_args['bilirubin levels'][0])):
                        if((float(df_args['bilirubin levels'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for bilirubin levels'))
                except ValueError as e:
                    return (str('Please Enter Number for bilirubin levels'))
        
        if( (df_args['cord_ph'][0] != 'NA') ):
                try:
                    if(float(df_args['cord_ph'][0])):
                        if((float(df_args['cord_ph'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for cord_ph'))
                except ValueError as e:
                    return (str('Please Enter Number for cord_ph'))
        
        if( (df_args['absolute_neutrophil_count'][0] != 'NA') ):
                try:
                    if(float(df_args['absolute_neutrophil_count'][0])):
                        if((float(df_args['absolute_neutrophil_count'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for absolute_neutrophil_count'))
                except ValueError as e:
                    return (str('Please Enter Number for absolute_neutrophil_count'))
        
        if( (df_args['mother_age'][0] != 'NA') ):
                try:
                    if(float(df_args['mother_age'][0])):
                        if((float(df_args['mother_age'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for mother_age'))
                except ValueError as e:
                    return (str('Please Enter Number for mother_age'))
        
        if( (df_args['mother_weight'][0] != 'NA') ):
                try:
                    if(float(df_args['mother_weight'][0])):
                        if((float(df_args['mother_weight'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for mother_weight'))
                except ValueError as e:
                    return (str('Please Enter Number for mother_weight'))
        
        if( (df_args['mother_bmi'][0] != 'NA') ):
                try:
                    if(float(df_args['mother_bmi'][0])):
                        if((float(df_args['mother_bmi'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for mother_bmi'))
                except ValueError as e:
                    return (str('Please Enter Number for mother_bmi'))
        
        if( (df_args['maternal_fever'][0] != 'NA') ):
                try:
                    if(float(df_args['maternal_fever'][0])):
                        if((float(df_args['maternal_fever'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for maternal_fever'))
                except ValueError as e:
                    return (str('Please Enter Number for maternal_fever'))

        if( (df_args['csf_culture_tsb_value'][0] != 'NA') ):
                try:
                    if(float(df_args['csf_culture_tsb_value'][0])):
                        if((float(df_args['csf_culture_tsb_value'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for csf_culture_tsb_value'))
                except ValueError as e:
                    return (str('Please Enter Number for csf_culture_tsb_value'))       


        if( (df_args['breathing_rate'][0] != 'NA') ):
                try:
                    if(float(df_args['breathing_rate'][0])):
                        if((float(df_args['breathing_rate'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for breathing_rate'))
                except ValueError as e:
                    return (str('Please Enter Number for breathing_rate'))
                    
                    
        if( (df_args['sodium'][0] != 'NA') ):
                try:
                    if(float(df_args['sodium'][0])):
                        if((float(df_args['sodium'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for sodium'))
                except ValueError as e:
                    return (str('Please Enter Number for sodium'))                   

        if( (df_args['urea'][0] != 'NA') ):
                try:
                    if(float(df_args['urea'][0])):
                        if((float(df_args['urea'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for urea'))
                except ValueError as e:
                    return (str('Please Enter Number for urea'))     



        #Input validations for String Columns                   
        if( (df_args['birth_facility'][0] != 'NA') ):
            if((str(df_args['birth_facility'][0]) == 'ICU') or (str(df_args['birth_facility'][0]) == 'NICU')):
                pass
            else:
                return(str('invalid entry for birth_facility'))  
        
        if( (df_args['rupture_of_membranes_rom_one'][0] != 'NA') ):
            if((str(df_args['rupture_of_membranes_rom_one'][0]) == 'PROM') or (str(df_args['rupture_of_membranes_rom_one'][0]) == 'ARM') or (str(df_args['rupture_of_membranes_rom_one'][0]) == 'SROM')):
                pass
            else:
                return(str('invalid entry for rupture_of_membranes_rom_one')) 
        
        if( (df_args['baby_cry_sound'][0] != 'NA') ):
            if((str(df_args['baby_cry_sound'][0]) == 'Normal') or (str(df_args['baby_cry_sound'][0]) == 'Low Pitch') or (str(df_args['baby_cry_sound'][0]) == 'High Pitch') or (str(df_args['baby_cry_sound'][0]) == 'Not Cried')):
                pass
            else:
                return(str('invalid entry for baby_cry_sound')) 
        
        if( (df_args['baby_skin_colour'][0] != 'NA') ):
            if((str(df_args['baby_skin_colour'][0]) == 'Pink') or (str(df_args['baby_skin_colour'][0]) == 'Pale') or (str(df_args['baby_skin_colour'][0]) == 'Acrocyanosis') or (str(df_args['baby_skin_colour'][0]) == 'Peripheral Duskiness') or (str(df_args['baby_skin_colour'][0]) == 'Central Cyanosis')):
                pass
            else:
                return(str('invalid entry for baby_skin_colour')) 
        
        if( (df_args['capillary_refill_unit'][0] != 'NA') ):
            if((str(df_args['capillary_refill_unit'][0]) == '< 3 Sec') or (str(df_args['capillary_refill_unit'][0]) == '> 3 Sec') or (str(df_args['capillary_refill_unit'][0]) == '= 3 Sec') or (str(df_args['capillary_refill_unit'][0]) == '=0 Sec')):
                pass
            else:
                return(str('invalid entry for capillary_refill_unit'))
        
        if( (df_args['baby_feeding_status'][0] != 'NA') ):
            if((str(df_args['baby_feeding_status'][0]) == 'Normal') or (str(df_args['baby_feeding_status'][0]) == 'No Feeding') or (str(df_args['baby_feeding_status'][0]) == 'Poor')):
                pass
            else:
                return(str('invalid entry for baby_feeding_status'))
        
        if( (df_args['fast_breathing'][0] != 'NA') ):
            if((str(df_args['fast_breathing'][0]) == 'Yes') or (str(df_args['fast_breathing'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for fast_breathing'))
        
        if( (df_args['breast_feeding_initiation'][0] != 'NA') ):
            if((str(df_args['breast_feeding_initiation'][0]) == 'Yes') or (str(df_args['breast_feeding_initiation'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for breast_feeding_initiation'))
        
        if( (df_args['groaning'][0] != 'NA') ):
            if((str(df_args['groaning'][0]) == 'Yes') or (str(df_args['groaning'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for groaning'))
        
        if( (df_args['baby_chest_indrawing'][0] != 'NA') ):
            if((str(df_args['baby_chest_indrawing'][0]) == 'Yes') or (str(df_args['baby_chest_indrawing'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for baby_chest_indrawing'))
        
        
        if( (df_args['x_ray_result'][0] != 'NA') ):
            if((str(df_args['x_ray_result'][0]) == 'Normal') or (str(df_args['x_ray_result'][0]) == 'Abnormal')):
                pass
            else:
                return(str('invalid entry for x_ray_result'))
        
        if( (df_args['feeding_intolerance'][0] != 'NA') ):
            if((str(df_args['feeding_intolerance'][0]) == 'Yes') or (str(df_args['feeding_intolerance'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for feeding_intolerance'))

        if( (df_args['baby_movement'][0] != 'NA') ):
            if((str(df_args['baby_movement'][0]) == 'Yes') or (str(df_args['baby_movement'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for baby_movement'))        

        if( (df_args['csf_culture'][0] != 'NA') ):
            if((str(df_args['csf_culture'][0]) == 'Normal') or (str(df_args['csf_culture'][0]) == 'Abnormal') or (str(df_args['csf_culture'][0]) == 'Negative') or (str(df_args['csf_culture'][0]) == 'Positive')):
                pass
            else:
                return(str('invalid entry for csf_culture'))
        
        if( (df_args['type_of_delivery'][0] != 'NA') ):
            if((str(df_args['type_of_delivery'][0]) == 'Cesarean') or (str(df_args['type_of_delivery'][0]) == 'Normal')):
                pass
            else:
                return(str('invalid entry for type_of_delivery'))

        if( (df_args['rupture_of_membranes_rom_two'][0] != 'NA') ):
            if((str(df_args['rupture_of_membranes_rom_two'][0]) == '<18 hours') or (str(df_args['rupture_of_membranes_rom_two'][0]) == '>18 hours')):
                pass
            else:
                return(str('invalid entry for rupture_of_membranes_rom_two'))
           
        #Load Model Dataset and High accuracy Features
        #Create a Dataframe with high accuracy features using model dataset
        df_hospital_x = pd.read_pickle('./invasive/pipeline/df_hospital_x.pkl')     
        df_bcr = pd.DataFrame(df_hospital_x['blood_culture_report'])
        df_features = pd.read_pickle('./invasive/pipeline/highaccuracyfeatures.pkl')     
        df_hospital_x = pd.DataFrame(columns=df_features['features'].values,data=df_hospital_x)
        df_hospital_x = pd.merge(df_hospital_x, df_bcr, left_index=True, right_index=True)
        
        #Replacing NA with NaN values for arguments dataframe
        df_args = df_args.replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN)
        
               
        
        #Feature Transformations based on List of Indicators provided by expert medical professionals
        #Potassium transformation   
        df_args[['potassium']] = df_args[['potassium']].astype('float64')
        df_temp = round(df_args[['potassium']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['potassium'] = df_temp['potassium'].astype('float64')
        
        conditions = [
                    ((df_temp['potassium'] >= 4.60) & (df_temp['potassium'] <= 6.70)),
                    ((df_temp['potassium'] > 6.70) | (df_temp['potassium'] < 4.60))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['potassium'] = np.select(conditions, choices,default='NA')
        df_args['potassium_status'] = df_temp['potassium']
        
        
        #Phosphate transformation   
        df_args[['phosphate']] = df_args[['phosphate']].astype('float64')
        df_temp = round(df_args[['phosphate']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['phosphate'] = df_temp['phosphate'].astype('float64')
        
        conditions = [
                    ((df_temp['phosphate'] >= 1.70) & (df_temp['phosphate'] <= 3.50)),
                    ((df_temp['phosphate'] > 3.50) | (df_temp['phosphate'] < 1.70))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['phosphate'] = np.select(conditions, choices,default='NA')
        df_args['phosphate_status'] = df_temp['phosphate']
        
        
        #chlorine transformation   
        df_args[['chlorine']] = df_args[['chlorine']].astype('float64')
        df_temp = round(df_args[['chlorine']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['chlorine'] = df_temp['chlorine'].astype('float64')
        
        conditions = [
                        ((df_temp['chlorine'] >= 100.00) & (df_temp['chlorine'] <= 117.00)),
                        ((df_temp['chlorine'] > 117.00) | (df_temp['chlorine'] < 100.00))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['chlorine'] = np.select(conditions, choices,default='NA')
        df_args['chlorine_status'] = df_temp['chlorine']
        
        
        #sodium transformation   
        df_args[['sodium']] = df_args[['sodium']].astype('float64')
        df_temp = round(df_args[['sodium']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['sodium'] = df_temp['sodium'].astype('float64')
        
        conditions = [
                        ((df_temp['sodium'] >= 133.00) & (df_temp['sodium'] <= 146.00)),
                        ((df_temp['sodium'] > 146.00) | (df_temp['sodium'] < 133.00))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['sodium'] = np.select(conditions, choices,default='NA')
        df_args['sodium_status'] = df_temp['sodium']
        
        
        #Urea transformation   
        df_args[['urea']] = df_args[['urea']].astype('float64')
        df_temp = round(df_args[['urea']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['urea'] = df_temp['urea'].astype('float64')
        
        conditions = [
                    ((df_temp['urea'] >= 1.10) & (df_temp['urea'] <= 9.10)),
                    ((df_temp['urea'] > 9.10) | (df_temp['urea'] < 1.10))  
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['urea'] = np.select(conditions, choices,default='NA')
        df_args['urea_status'] = df_temp['urea']
        
        
        #rupture_of_membranes_rom_two transformation   
        df_args['rupture_of_membranes_rom_two'] = df_args['rupture_of_membranes_rom_two'].replace(">18hours",">18 hours").replace("<18hours","<18 hours")
        df_temp_rom2 = df_args[['rupture_of_membranes_rom_two']].astype('str')
        df_temp_rom2[['rupture_of_membranes_rom_two']] = df_temp_rom2[['rupture_of_membranes_rom_two']].replace(">18 hours",1000)
        df_temp_rom2[['rupture_of_membranes_rom_two']] = df_temp_rom2[['rupture_of_membranes_rom_two']].replace("<18 hours",-1)
        df_temp_rom2['rupture_of_membranes_rom_two']   = df_temp_rom2['rupture_of_membranes_rom_two'].replace('NA',np.NaN)
        df_temp_rom2['rupture_of_membranes_rom_two']   = df_temp_rom2['rupture_of_membranes_rom_two'].astype('float64')
        
        conditions = [
                        ((df_temp_rom2['rupture_of_membranes_rom_two'] > 18.0)),
                        ((df_temp_rom2['rupture_of_membranes_rom_two'] <= 18.0))
                     ]
     
        choices = ['Yes', 'No']
        df_temp_rom2['rupture_of_membranes_rom_two_new'] = np.select(conditions, choices,default=np.NaN)
        df_args['rupture_of_membranes_rom_2'] = df_temp_rom2['rupture_of_membranes_rom_two_new']
        

        #bilirubin_levels transformation   
        df_args[['bilirubin levels']] = df_args[['bilirubin levels']].astype('float64')
        df_temp = round(df_args[['bilirubin levels']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['bilirubin levels'] = df_temp['bilirubin levels'].astype('float64')
        
        conditions = [
                         ((df_temp['bilirubin levels'] < 5.20)),
                         ((df_temp['bilirubin levels'] >= 5.20))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['bilirubin levels'] = np.select(conditions, choices,default='NA')
        df_args['bilirubin_status'] = df_temp['bilirubin levels']
        
        
        
        #cord_ph transformation   
        df_args[['cord_ph']] = df_args[['cord_ph']].astype('float64')
        df_temp = round(df_args[['cord_ph']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['cord_ph'] = df_temp['cord_ph'].astype('float64')
        
        conditions = [
                      ((df_temp['cord_ph'] < 7.33)),
                      ((df_temp['cord_ph'] > 7.45)),
                      ((df_temp['cord_ph'] >= 7.33) & (df_temp['cord_ph'] <= 7.45))
                     ]     
        choices = ['Acidosis','Alkalosis','Normal']
        df_temp['cord_ph'] = np.select(conditions, choices,default='NA')
        df_args['cord_ph_status'] = df_temp['cord_ph']
        
        
        
        #baby_gestational_age transformation   
        df_args[['baby_gestational_age']] = df_args[['baby_gestational_age']].astype('float64')
        df_temp = round(df_args[['baby_gestational_age']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['baby_gestational_age'] = df_temp['baby_gestational_age'].astype('float64')
        
        conditions = [
                         ((df_temp['baby_gestational_age']>28.0) & (df_temp['baby_gestational_age']<37.0)),
                         (df_temp['baby_gestational_age'] <= 28.0),
                         (df_temp['baby_gestational_age'] >= 37.0)
                     ]     
        choices = ['preterm', 'premature', 'fullterm']
        df_temp['baby_gestational_age'] = np.select(conditions, choices,default='NA')
        df_args['preterm_status'] = df_temp['baby_gestational_age']
        
        
        
        #baby_weight_at_birth transformation   
        df_args[['baby_weight_at_birth']] = df_args[['baby_weight_at_birth']].astype('float64')
        df_temp = round(df_args[['baby_weight_at_birth']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['baby_weight_at_birth'] = df_temp['baby_weight_at_birth'].astype('float64')
        
        conditions = [
                         ((df_temp['baby_weight_at_birth']>=2.50)),
                         ((df_temp['baby_weight_at_birth']>=1.50) & (df_temp['baby_weight_at_birth']<= 2.49)),
                         (df_temp['baby_weight_at_birth']>=1.00) & (df_temp['baby_weight_at_birth']<= 1.49),
                         (df_temp['baby_weight_at_birth'] <1.00)
                     ]     
        choices = ['Normal', 'Low', 'Very Low', 'Extremely Low']
        df_temp['baby_weight_at_birth'] = np.select(conditions, choices,default='NA')
        df_args['baby_weight_birth'] = df_temp['baby_weight_at_birth']
        
        
        
        #baby_blood_glucose transformation   
        df_args[['baby_blood_glucose']] = df_args[['baby_blood_glucose']].astype('float64')
        df_temp = round(df_args[['baby_blood_glucose']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['baby_blood_glucose'] = df_temp['baby_blood_glucose'].astype('float64')
        
        conditions = [
                        ((df_temp['baby_blood_glucose'] < 45.00)),
                        ((df_temp['baby_blood_glucose'] > 125.00)),
                        ((df_temp['baby_blood_glucose'] >= 45.00) & (df_temp['baby_blood_glucose'] <= 125.00))
                     ]     
        choices = ['Hypoglycemia', 'Hyperglycemia','Normal']
        df_temp['baby_blood_glucose'] = np.select(conditions, choices,default='NA')
        df_args['baby_bloodglucose_status'] = df_temp['baby_blood_glucose']
        
        
        
        #baby_haemoglobin_levels transformation   
        df_args[['baby_haemoglobin_levels']] = df_args[['baby_haemoglobin_levels']].astype('float64')
        df_temp = round(df_args[['baby_haemoglobin_levels']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['baby_haemoglobin_levels'] = df_temp['baby_haemoglobin_levels'].astype('float64')
        
        conditions = [
                        ((df_temp['baby_haemoglobin_levels'] <= 21.50) & (df_temp['baby_haemoglobin_levels'] >= 17.10)),
                        ((df_temp['baby_haemoglobin_levels'] > 21.50) | (df_temp['baby_haemoglobin_levels'] < 17.10))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['baby_haemoglobin_levels'] = np.select(conditions, choices,default='NA')
        df_args['baby_haemoglobin_status'] = df_temp['baby_haemoglobin_levels']
        
        
        
        #baby_c_reactive_protien_levels transformation   
        df_args[['baby_c_reactive_protien_levels']] = df_args[['baby_c_reactive_protien_levels']].astype('float64')
        df_temp = round(df_args[['baby_c_reactive_protien_levels']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['baby_c_reactive_protien_levels'] = df_temp['baby_c_reactive_protien_levels'].astype('float64')
        
        conditions = [
                        ((df_temp['baby_c_reactive_protien_levels'] < 3)),
                        ((df_temp['baby_c_reactive_protien_levels'] >= 3))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['baby_c_reactive_protien_levels'] = np.select(conditions, choices,default='NA')
        df_args['baby_creactiveprotien_levels'] = df_temp['baby_c_reactive_protien_levels']
        
        
        
        #total_leucocute_count transformation   
        df_args[['total_leucocute_count']] = df_args[['total_leucocute_count']].astype('float64')
        df_temp = round(df_args[['total_leucocute_count']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN)
        df_temp['total_leucocute_count'] = df_temp['total_leucocute_count'].astype('float64')
        
        conditions = [
                        ((df_temp['total_leucocute_count'] >= 5000.0) & (df_temp['total_leucocute_count'] <= 10000.0)),
                        ((df_temp['total_leucocute_count'] > 10000.0) | (df_temp['total_leucocute_count'] < 5000.0))
                     ]     
        choices = ['Normal','Abnormal']
        df_temp['total_leucocute_count'] = np.select(conditions, choices,default='NA')
        df_args['wbc_status'] = df_temp['total_leucocute_count']
        
        #breathing_rate transformation   
        df_temp = df_args[['breathing_rate']].astype('str')
        df_temp = round(df_args[['breathing_rate']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN).replace('NA',np.NaN)
        df_temp['breathing_rate'] = df_temp['breathing_rate'].astype('float64')
        
        conditions = [
                        ((df_temp['breathing_rate'] <= 60.00) & (df_temp['breathing_rate'] >= 40.00)),
                        ((df_temp['breathing_rate'] < 40.00)),
                        ((df_temp['breathing_rate'] > 60.00))
                     ]     
        choices = ['Normal', 'Low', 'Tachpnea']
        df_temp['breathing_rate'] = np.select(conditions, choices,default='NA')
        df_args['breathing_permin'] = df_temp['breathing_rate']
        
        #Drop Original Columns to reshape the Dataframe and keep the Transformed Columns as Input to Model
        df_args =    df_args.drop(columns=[
                            'cord_ph',
                            'bilirubin levels',
                            'phosphate',
                            'chlorine',
                            'potassium',
                            'total_leucocute_count',
                            'baby_c_reactive_protien_levels',
                            'baby_haemoglobin_levels',
                            'baby_blood_glucose',
                            'baby_gestational_age',
                            'sodium',
                            'urea',
                            'rupture_of_membranes_rom_two',
                            'breathing_rate'
                            ])
                            



        
        #Creating Dataframe based on features passed as arguments from API
        df_hospital_x = pd.concat([df_hospital_x, df_args], ignore_index=True, sort=False)
        
        #Label Encoding and Imputing the dataset using KNNImputer
        #Fetching NULL value indices from dataset
        #Label Encoding the Dataset and filling NULL value indices with -100
        #Replace the -100 value with imputed value using KNNImputation Technique
        class LEncode_KImpute(BaseEstimator, TransformerMixin):
            def fit(self, X, y=None):
                return self

            def transform(self, X, y=None):
                null_rows = [index for index, row in X.iterrows() if row.isnull().any()]
                r,c = np.where(X.isnull().values)
                null_row = null_rows[0]
                null_column = X.columns[c[0]]
                value_nan = X._get_value(null_row, null_column)
                
                X = X.astype('str')
                X = pd.DataFrame(columns=X.columns,data=LabelEncoder().fit_transform(X.values.flatten()).reshape(X.shape))
                X  = X.replace(value_nan,np.nan)
                
                X =X.fillna(-100)
                imputer = KNNImputer(missing_values=-100,n_neighbors=5, weights='uniform', metric='nan_euclidean')
                X_imputed = imputer.fit_transform(X)
                X_imputed = pd.DataFrame(X_imputed)
                X_imputed.columns = X.columns
                return X_imputed
        
        #Oversampling the Dataset to balance the minority class which is negative blood culture report
        class ROSampling(BaseEstimator, TransformerMixin):
            def fit(self, X, y=None):
                return self

            def transform(self, X, y=None):
                Xos = X[:-1]
                rovr = RandomOverSampler(random_state=42)
                x_rovr, y_rovr = rovr.fit_resample(Xos.drop(columns=['blood_culture_report']), Xos['blood_culture_report'])
                Xos = x_rovr.join(y_rovr) 
                X = pd.concat([Xos, X.iloc[-1:]], ignore_index=True, sort=False)
                return X


        #Split the Oversampled dataset to Train and Test samples with ratio of 70:30
        #Use Training sample to create LightGBM model
        #Using predict_proba function to predict the sepsis results
        class traintest_predict(BaseEstimator, TransformerMixin):
            def fit(self, X, y=None):
                return self

            def transform(self, X, y=None):
                last_row = X.iloc[-1:]
                last_row = last_row.drop(columns=['blood_culture_report'])
                X = X[:-1] 
                x_train, x_test, y_train, y_test = train_test_split(X.drop(columns=['blood_culture_report']), X['blood_culture_report'], test_size = 0.3, random_state = 0)
                lgbmmodel = LGBMClassifier(objective='binary',learning_rate=0.5,reg_alpha=5,reg_lambda=4) 
                lgbmmodel.fit(x_train, y_train)
                X = lgbmmodel.predict_proba(last_row) 
                X = X[0][1] * 10
                return X


        
        #Using ColumnTransformer to LabelEncode and Impute DataFrame
        #Creating a pipeline for preprocessing, Oversampling and creating LGBM Model
        preprocessor = ColumnTransformer(transformers=[
                                               ("LabelEncode_KNNImpute",LEncode_KImpute(), df_hospital_x.drop(columns=['blood_culture_report']).columns)
                                              
                                              ],
                                 remainder='passthrough'
                                )
        
        preprocessing_pipeline = Pipeline(steps=[('preprocessor', preprocessor)])        
        df_encoded_imputed = preprocessing_pipeline.fit_transform(df_hospital_x.drop(columns=['blood_culture_report']), df_hospital_x['blood_culture_report'])        
        df_encoded_imputed = pd.DataFrame(columns=df_hospital_x.drop(columns=['blood_culture_report']).columns,data=df_encoded_imputed) 
        df_encoded_imputed = pd.merge(df_encoded_imputed, df_hospital_x['blood_culture_report'], left_index=True, right_index=True)
        LGBM_model = Pipeline(
            steps=[
                 ("RandomOversampler", ROSampling()),
                 ("Model", traintest_predict())
                 
                  ]
               )


        #Store the results of Predictions
        #Generate score based on comparison of greater probability value between positive and negative blood_culture_report results
        df_invpred = LGBM_model.fit_transform(df_encoded_imputed, df_encoded_imputed['blood_culture_report'])

        return (str(df_invpred))
    return render_template("getscore.html")
    
    
  
@app.route('/noninvasive/getniscore', methods=['POST'])
def noninvasive():
    if request.method == "POST":
    
        #Create dataframe of arguments
        #Replace erratic values with original values of Model
        #Removing Leading and Trailing spaces
        params = request.form.to_dict()
        df_args_ni = pd.DataFrame([params.values()], columns=params.keys())
        df_args_ni = df_args_ni.drop(['study_id'],axis=1)
        df_args_ni = df_args_ni.replace(r'\s+', '', regex=True)
        df_args_ni = df_args_ni.replace('(?i)na', 'NA', regex=True).replace('(?i)nan','NA', regex=True).replace('','NA',regex=True)
        df_args_ni = df_args_ni.replace('(?i)yes', 'Yes',regex=True).replace('(?i)no', 'No',regex=True)
        df_args_ni = df_args_ni.replace(r"^ +| +$", r"", regex=True) 
        df_args_ni = df_args_ni.replace('AcrocyaNosis','Acrocyanosis').replace('PeripheralDuskiness','Peripheral Duskiness').replace('CentralCyanosis','Central Cyanosis')
        df_args_ni = df_args_ni.replace('AbNormal','Abnormal')
        df_args_ni = df_args_ni.replace('<3Sec','< 3 Sec').replace('>3Sec','> 3 Sec').replace('=0Sec','= 0 Sec').replace('=3Sec','= 3 Sec')
        df_args_ni = df_args_ni.replace('<18hours','<18 hours').replace('>18hours','>18 hours')
        
        
        #Get Model Dataset and Features
        #Create a Dataframe based on high accuracy features
        df_NI_hospital = pd.read_pickle('./noninvasive/pipeline/df_NI_hospital.pkl')     
        df_NI_bcr = pd.DataFrame(df_NI_hospital['blood_culture_report'])
        df_NI_features = pd.read_pickle('./noninvasive/pipeline/selected_lgbmtreefeat.pkl')     
        df_NI_hospital = pd.DataFrame(columns=df_NI_features[0].values,data=df_NI_hospital)
        df_NI_hospital = pd.merge(df_NI_hospital, df_NI_bcr, left_index=True, right_index=True)
        
        
        #Input Validations all columns of NonInvasive
        if( (df_args_ni['baby_apgar_score_one_min'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_apgar_score_one_min'][0])):
                        if((float(df_args_ni['baby_apgar_score_one_min'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_apgar_score_one_min'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_apgar_score_one_min'))
        
       
        if( (df_args_ni['baby_apgar_score_five_min'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_apgar_score_five_min'][0])):
                        if((float(df_args_ni['baby_apgar_score_five_min'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_apgar_score_five_min'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_apgar_score_five_min'))
        
        
        if( (df_args_ni['baby_apgar_score_ten_min'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_apgar_score_ten_min'][0])):
                        if((float(df_args_ni['baby_apgar_score_ten_min'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_apgar_score_ten_min'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_apgar_score_ten_min'))



        if( (df_args_ni['birth_facility'][0] != 'NA') ):
            if((str(df_args_ni['birth_facility'][0]) == 'ICU') or (str(df_args_ni['birth_facility'][0]) == 'NICU')):
                pass
            else:
                return(str('invalid entry for birth_facility'))  


        if( (df_args_ni['baby_weight_at_birth'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_weight_at_birth'][0])):
                        if((float(df_args_ni['baby_weight_at_birth'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_weight_at_birth'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_weight_at_birth'))
        
        if( (df_args_ni['baby_weight_at_admission'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_weight_at_admission'][0])):
                        if((float(df_args_ni['baby_weight_at_admission'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_weight_at_admission'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_weight_at_admission'))
        
        
        if( (df_args_ni['mother_age'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['mother_age'][0])):
                        if((float(df_args_ni['mother_age'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for mother_age'))
                except ValueError as e:
                    return (str('Please Enter Number for mother_age'))
                    
                    
        if( (df_args_ni['mother_weight'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['mother_weight'][0])):
                        if((float(df_args_ni['mother_weight'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for mother_weight'))
                except ValueError as e:
                    return (str('Please Enter Number for mother_weight'))
       
        
        if( (df_args_ni['mother_bmi'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['mother_bmi'][0])):
                        if((float(df_args_ni['mother_bmi'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for mother_bmi'))
                except ValueError as e:
                    return (str('Please Enter Number for mother_bmi'))
        
        if( (df_args_ni['maternal_blood_pressure'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['maternal_blood_pressure'][0])):
                        if((float(df_args_ni['maternal_blood_pressure'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for maternal_blood_pressure'))
                except ValueError as e:
                    return (str('Please Enter Number for maternal_blood_pressure'))
       
        if( (df_args_ni['maternal_blood_pressure_diastolic'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['maternal_blood_pressure_diastolic'][0])):
                        if((float(df_args_ni['maternal_blood_pressure_diastolic'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for maternal_blood_pressure_diastolic'))
                except ValueError as e:
                    return (str('Please Enter Number for maternal_blood_pressure_diastolic'))
        
        if( (df_args_ni['maternal_fever'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['maternal_fever'][0])):
                        if((float(df_args_ni['maternal_fever'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for maternal_fever'))
                except ValueError as e:
                    return (str('Please Enter Number for maternal_fever'))
        
        if( (df_args_ni['rupture_of_membranes_rom_one'][0] != 'NA') ):
            if((str(df_args_ni['rupture_of_membranes_rom_one'][0]) == 'PROM') or (str(df_args_ni['rupture_of_membranes_rom_one'][0]) == 'ARM') or (str(df_args_ni['rupture_of_membranes_rom_one'][0]) == 'SROM')):
                pass
            else:
                return(str('invalid entry for rupture_of_membranes_rom_one')) 
        
        if( (df_args_ni['type_of_delivery'][0] != 'NA') ):
            if((str(df_args_ni['type_of_delivery'][0]) == 'Cesarean') or (str(df_args_ni['type_of_delivery'][0]) == 'Normal')):
                pass
            else:
                return(str('invalid entry for type_of_delivery'))
        
        if( (df_args_ni['baby_skin_colour'][0] != 'NA') ):
            if((str(df_args_ni['baby_skin_colour'][0]) == 'Pink') or (str(df_args_ni['baby_skin_colour'][0]) == 'Pale') or (str(df_args_ni['baby_skin_colour'][0]) == 'Acrocyanosis') or (str(df_args_ni['baby_skin_colour'][0]) == 'Peripheral Duskiness') or (str(df_args_ni['baby_skin_colour'][0]) == 'Central Cyanosis')):
                pass
            else:
                return(str('invalid entry for baby_skin_colour'))

                
        if( (df_args_ni['baby_cry_sound_status'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_cry_sound_status'][0])):
                        if((float(df_args_ni['baby_cry_sound_status'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_cry_sound_status'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_cry_sound_status'))
        
        if( (df_args_ni['breathing_rate'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['breathing_rate'][0])):
                        if((float(df_args_ni['breathing_rate'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for breathing_rate'))
                except ValueError as e:
                    return (str('Please Enter Number for breathing_rate'))      


        if( (df_args_ni['baby_chest_indrawing'][0] != 'NA') ):
            if((str(df_args_ni['baby_chest_indrawing'][0]) == 'Yes') or (str(df_args_ni['baby_chest_indrawing'][0]) == 'No')):
                pass
            else:
                return(str('invalid entry for baby_chest_indrawing'))

        if( (df_args_ni['heart_rate'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['heart_rate'][0])):
                        if((float(df_args_ni['heart_rate'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for heart_rate'))
                except ValueError as e:
                    return (str('Please Enter Number for heart_rate'))

        if( (df_args_ni['baby_blood_pressure_mean_arterial_bp'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_blood_pressure_mean_arterial_bp'][0])):
                        if((float(df_args_ni['baby_blood_pressure_mean_arterial_bp'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_blood_pressure_mean_arterial_bp'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_blood_pressure_mean_arterial_bp'))

        if( (df_args_ni['baby_blood_pressure_upper_limb'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_blood_pressure_upper_limb'][0])):
                        if((float(df_args_ni['baby_blood_pressure_upper_limb'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_blood_pressure_upper_limb'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_blood_pressure_upper_limb'))

        if( (df_args_ni['baby_blood_pressure_lower_limb'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_blood_pressure_lower_limb'][0])):
                        if((float(df_args_ni['baby_blood_pressure_lower_limb'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_blood_pressure_lower_limb'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_blood_pressure_lower_limb'))                   

        if( (df_args_ni['baby_blood_pressure_lower_limb'][0] != 'NA') ):
                try:
                    if(float(df_args_ni['baby_blood_pressure_lower_limb'][0])):
                        if((float(df_args_ni['baby_blood_pressure_lower_limb'][0]) > float(0))):
                            pass
                        else:
                            return(str('Out of Range for baby_blood_pressure_lower_limb'))
                except ValueError as e:
                    return (str('Please Enter Number for baby_blood_pressure_lower_limb'))

        if( (df_args_ni['baby_movement'][0] != 'NA') ):
                    if((str(df_args_ni['baby_movement'][0]) == 'Yes') or (str(df_args_ni['baby_movement'][0]) == 'No')):
                        pass
                    else:
                        return(str('invalid entry for baby_movement'))




       
        #Feature Transformations Non-Invasive

        #breathing_rate transformation   
        df_temp = df_args_ni[['breathing_rate']].astype('str')
        df_temp = round(df_args_ni[['breathing_rate']],2)
        df_temp = df_temp.astype('str')
        df_temp = df_temp.replace(" ","")
        df_temp = df_temp.replace('nan',np.NaN).replace('NA',np.NaN)
        df_temp['breathing_rate'] = df_temp['breathing_rate'].astype('float64')
        
        conditions = [
                        ((df_temp['breathing_rate'] <= 60.00) & (df_temp['breathing_rate'] >= 40.00)),
                        ((df_temp['breathing_rate'] < 40.00)),
                        ((df_temp['breathing_rate'] > 60.00))
                     ]     
        choices = ['Normal', 'Low', 'Tachpnea']
        df_temp['breathing_rate'] = np.select(conditions, choices,default='NA')
        df_args_ni['breathing_permin'] = df_temp['breathing_rate']
        
        

        df_args_ni =    df_args_ni.drop(columns=[
                                            'breathing_rate',
                                                                                     
                                            ])
        
        
        #Replacing NA with NaN values
        df_args_ni = df_args_ni.replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN)

        
        #Creating Dataframe based on features
        df_NI_hospital = pd.concat([df_NI_hospital, df_args_ni], ignore_index=True, sort=False)
        df_NI_hospital = df_NI_hospital.replace(pd.NA,np.NaN).replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN).replace('<NA>',np.NaN)
        
        
        
        #Label Encoding and Imputing the dataset using KNNImputer
        #Fetching NULL value indices from dataset
        #Label Encoding the Dataset and filling NULL value indices with -100
        #Replace the -100 value with imputed value using KNNImputation Technique
        class NI_LEncode_KImpute(BaseEstimator, TransformerMixin):
            def fit(self, X, y=None):
                return self

            def transform(self, X, y=None):
                null_rows = [index for index, row in X.iterrows() if row.isnull().any()]
                r,c = np.where(X.isnull().values)
                null_row = null_rows[0]
                null_column = X.columns[c[0]]
                value_nan = X._get_value(null_row, null_column)
                X = X.astype('str')
                X = pd.DataFrame(columns=X.columns,data=LabelEncoder().fit_transform(X.values.flatten()).reshape(X.shape))
                X  = X.replace(value_nan,np.nan)
                
                X =X.fillna(-100)
                imputer = KNNImputer(missing_values=-100,n_neighbors=5, weights='uniform', metric='nan_euclidean')
                X_imputed = imputer.fit_transform(X)
                X_imputed = pd.DataFrame(X_imputed)
                X_imputed.columns = X.columns
                return X_imputed
        
        #Oversampling the Dataset to balance the minority class which is negative blood culture report
        class NI_ROSampling(BaseEstimator, TransformerMixin):
            def fit(self, X, y=None):
                return self

            def transform(self, X, y=None):
                Xos = X[:-1]
                rovr = RandomOverSampler(random_state=42)
                x_rovr, y_rovr = rovr.fit_resample(Xos.drop(columns=['blood_culture_report']), Xos['blood_culture_report'])
                Xos = x_rovr.join(y_rovr) 
                X = pd.concat([Xos, X.iloc[-1:]], ignore_index=True, sort=False)
                return X
        
        #Dropping the new data to prevent multiple class problem during oversampling process
        #Storing the new data in last_row variable
        #Split the Oversampled dataset to Train and Test samples with ratio of 70:30
        #Use Training sample to create LightGBM model
        #Using predict_proba function to predict the sepsis results
        class NI_traintest_predict(BaseEstimator, TransformerMixin):
            def fit(self, X, y=None):
                return self

            def transform(self, X, y=None):
                last_row = X.iloc[-1:]
                last_row = last_row.drop(columns=['blood_culture_report'])
                X = X[:-1] 
                x_train, x_test, y_train, y_test = train_test_split(X.drop(columns=['blood_culture_report']), X['blood_culture_report'], test_size = 0.3, random_state = 0)
                lgbmmodel = LGBMClassifier()
                lgbmmodel.fit(x_train, y_train)
                X = lgbmmodel.predict_proba(last_row)   
                X = X[0][1] * 10
                #X = lgbmmodel.classes_
                return X
        
        
        #Using ColumnTransformer to LabelEncode and Impute DataFrame
        #Dropping the new data to prevent prevent erratic reshaping of dataframe
        #Dropping Label Encoded blood_culture_report column and replacing it with orignal blood_culture_report column
        #Concate new data to last row of dataframe after reshaping it
        #Creating a pipeline for preprocessing, Oversampling and creating LGBM Model
        preprocessor = ColumnTransformer(transformers=[
                                               ("LabelEncode_KNNImpute",NI_LEncode_KImpute(), df_NI_hospital.drop(columns=['blood_culture_report']).columns)
                                              
                                              ],
                                 remainder='passthrough'
                                )                         
        preprocessing_pipeline = Pipeline(steps=[('preprocessor', preprocessor)]) 
        df_NI_encoded_imputed = preprocessing_pipeline.fit_transform(df_NI_hospital.drop(columns=['blood_culture_report']), df_NI_hospital['blood_culture_report'])
        df_NI_encoded_imputed = pd.DataFrame(columns=df_NI_hospital.drop(columns=['blood_culture_report']).columns,data=df_NI_encoded_imputed) 
        last_row = df_NI_encoded_imputed.iloc[-1:]
        df_NI_encoded_imputed = df_NI_encoded_imputed[:-1]
        df_NI_encoded_imputed = pd.merge(df_NI_encoded_imputed, df_NI_bcr['blood_culture_report'], left_index=True, right_index=True)
        df_NI_encoded_imputed = pd.concat([df_NI_encoded_imputed, last_row], ignore_index=True, sort=False)
        NI_LGBM_model = Pipeline(
            steps=[
                 ("RandomOversampler", NI_ROSampling()),
                 ("Model", NI_traintest_predict())
                 
                  ]
               )
        
        #Store the results of Predictions
        #Generate score based on comparison of greater probability value between positive and negative blood_culture_report results
        df_noninvpred = NI_LGBM_model.fit_transform(df_NI_encoded_imputed, df_NI_encoded_imputed['blood_culture_report'])

        return str(df_noninvpred)
    return render_template("getniscore.html")


        

#
# Start the server
#

mode = "dev"

if __name__ == '__main__':
    if mode =="dev":
        app.run(host='0.0.0.0', debug=True,threaded=True,use_reloader = True)
    else:
        serve(app, host='0.0.0.0', port=5000, threads=2, url_prefix="/home")
        

