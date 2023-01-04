# coding: utf-8


import pandas as pd
import numpy as np
import profile
import joblib
import pickle
import os
import time

from flask import Flask, render_template, request, send_from_directory, jsonify
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS, cross_origin
from sklearn.impute import KNNImputer
from numpy.random import randint
from waitress import serve
from itertools import *



app = Flask(__name__)
cors = CORS(app,resource={r'/getscore/*':{'origins': '*'}}) #Change the * with react endpoint for restricted access



@app.route("/", methods=['GET'])
@cross_origin(origins = ['*'],headers=['access-control-allow-origin','Content-Type'])
def home():
    return (str("Application Running..."))
    



@app.route('/getscore', methods=['GET','POST'])
def form():
    if request.method == "POST":
    
        #Create dataframe of arguments
        d = request.form.to_dict()
        df_args = pd.DataFrame([d.values()], columns=d.keys())
        df_args = df_args.drop(['study_id'],axis=1)
        
        #Get Model Dataset and RandomForest 51 Features with their importance
        df_rf_feature_imp = pd.read_pickle('./RF51_features_importance.pkl') #Load Features & Importances
        df_hospital = pd.read_pickle('./df_hospital_imputed.pkl')     #Load Model Dataset
           
        
        
        #Replacing NA with NaN values
        df_args = df_args.replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN)
        
        #Creating Dataframe based on features & Appending new data to the dataframe
        df_hospital_test = pd.DataFrame(columns=df_rf_feature_imp['features'].values,data=df_hospital) #appending new data to last row in dataset
        df_args_hospital = pd.concat([df_hospital_test, df_args], ignore_index=True, sort=False)
        df_args_hospital = df_args_hospital.replace(pd.NA,np.NaN).replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN).replace('<NA>',np.NaN)
        
        
        #Fetching Null values indices of DataFrame   
        null_rows = [index for index, row in df_args_hospital.iterrows() if row.isnull().any()]
        r,c = np.where(df_args_hospital.isnull().values)
        null_row = null_rows[0]
        null_column = df_args_hospital.columns[c[0]]
        df_args_hospital = df_args_hospital.astype('str')
        
        
        #LabelEncoding dataset with new appended data and restoring null values to their indices
        df_args_hospital_lencoded = pd.DataFrame(columns=df_args_hospital.columns, data=LabelEncoder().fit_transform(df_args_hospital.values.flatten()).reshape(df_args_hospital.shape))
        value_nan = df_args_hospital_lencoded._get_value(null_row, null_column)
        df_args_hospital_lencoded = df_args_hospital_lencoded.astype('float')
        df_args_hospital_lencoded = df_args_hospital_lencoded.replace(value_nan,np.nan)  #Restoring Null values
        
          
        #start = time.process_time() 
        
        #Knn Imputation of null values
        imputer = KNNImputer(n_neighbors=5, weights='uniform', metric='nan_euclidean')
        imputer.fit(df_args_hospital_lencoded)
        df_args_hospital_lencoded_imputed = imputer.transform(df_args_hospital_lencoded)
        df_args_hospital_lencoded_imputed = pd.DataFrame(df_args_hospital_lencoded_imputed)
        df_args_hospital_lencoded_imputed.columns = df_args_hospital_lencoded.columns
        
        
        #return (str(time.process_time() - start)) 
        
         
        #Load and Run Model
        pickled_knnrfmodel = pickle.load(open('model_knnrf51.pkl', 'rb'))   
        predict_df = pd.DataFrame(pickled_knnrfmodel.predict(df_args_hospital_lencoded_imputed.iloc[-1:]))
        
       
        
        #Generate Score based on features importance
        df_args_51 = df_args
        unpivot_df_args = pd.melt(df_args_51, id_vars=None, value_vars=None, var_name='features_args', value_name='value_args', col_level=None, ignore_index=True)
        df_unpivot_args_imp = pd.concat([df_rf_feature_imp, unpivot_df_args], axis=1, join='inner')
        df_unpivot_args_imp = df_unpivot_args_imp.dropna(subset=['value_args']).reset_index(drop=True)
        imp_sum = df_unpivot_args_imp['importance'].sum()
        imp_sum = float(imp_sum)*float(10)
        imp_sum = round(imp_sum,1)
        predict_df = predict_df.astype('float')
        score = float(imp_sum) + float(predict_df.values)
        
        
        if (score>10.0):
            return (str(10).replace('[','').replace(']',''))
        else:
            return (str(score).replace('[','').replace(']',''))
        
        
        #return (df.to_html(classes="table table-striped"))
    return render_template("getscore.html")


@app.route('/noninvasive/getniscore', methods=['POST'])
def noninvasive():
    if request.method == "POST":
    
        #Create dataframe of arguments
        params = request.form.to_dict()
        df_args_ni = pd.DataFrame([params.values()], columns=params.keys())
        df_args_ni = df_args_ni.drop(['study_id'],axis=1)
        
        #Get Model Dataset and RandomForest 47 Features with their importance
        df_rf_nifeature_imp = pd.read_pickle('./noninvasive/RF_noninvasivefeatures_importances.pkl') #Load Features & Importances
        df_NI_hospital = pd.read_pickle('./noninvasive/df_NI_hospital.pkl')     #Load Model Dataset
        
        
        #Replacing NA with NaN values
        df_args_ni = df_args_ni.replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN)
        
        
        #Creating Dataframe based on features & Appending new data to the dataframe
        df_args_NI_hospital = pd.concat([df_NI_hospital, df_args_ni], ignore_index=True, sort=False)
        df_args_NI_hospital = df_args_NI_hospital.replace(pd.NA,np.NaN).replace('nan',np.NaN).replace('NaN',np.NaN).replace('NA',np.NaN).replace('',np.NaN).replace('<NA>',np.NaN)
        
        
        #Fetching Null values indices of DataFrame   
        null_rows_ni = [index for index, row in df_args_NI_hospital.iterrows() if row.isnull().any()]
        r_ni,c_ni = np.where(df_args_NI_hospital.isnull().values)
        null_row_ni = null_rows_ni[0]
        null_column_ni = df_args_NI_hospital.columns[c_ni[0]]
        df_args_NI_hospital = df_args_NI_hospital.astype('str')
        
        
        #LabelEncoding dataset with new appended data and restoring null values to their indices
        df_args_NI_hospital_lencoded = pd.DataFrame(columns=df_args_NI_hospital.columns, data=LabelEncoder().fit_transform(df_args_NI_hospital.values.flatten()).reshape(df_args_NI_hospital.shape))
        value_nan = df_args_NI_hospital_lencoded._get_value(null_row_ni, null_column_ni)
        df_args_NI_hospital_lencoded = df_args_NI_hospital_lencoded.astype('float')
        df_args_NI_hospital_lencoded = df_args_NI_hospital_lencoded.replace(value_nan,np.nan)  #Restoring Null values
        
        
        #Knn Imputation of null values
        imputer = KNNImputer(n_neighbors=5, weights='uniform', metric='nan_euclidean')
        imputer.fit(df_args_NI_hospital_lencoded)
        df_args_NI_hospital_lencoded_imputed = imputer.transform(df_args_NI_hospital_lencoded)
        df_args_NI_hospital_lencoded_imputed = pd.DataFrame(df_args_NI_hospital_lencoded_imputed)
        df_args_NI_hospital_lencoded_imputed.columns = df_args_NI_hospital_lencoded.columns
        #df_args_hospital_lencoded_imputed = df_args_hospital_lencoded_imputed.drop(['study_id'], axis=1)
        
        
        #Load and Run Model
        pickled_RFNImodel = pickle.load(open('./noninvasive/model_noninvasiveRF.pkl', 'rb')) 
        predict_NI = pd.DataFrame(pickled_RFNImodel.predict(df_args_NI_hospital_lencoded_imputed.iloc[-1:]))
        
        
        #Generate Score based on features importance
        df_args_47 = df_args_ni
        unpivot_df_args_47 = pd.melt(df_args_47, id_vars=None, value_vars=None, var_name='features_args', value_name='value_args', col_level=None, ignore_index=True)
        df_unpivot_args_47_imp = pd.concat([df_rf_nifeature_imp, unpivot_df_args_47], axis=1, join='inner')
        df_unpivot_args_47_imp = df_unpivot_args_47_imp.dropna(subset=['value_args']).reset_index(drop=True)
        imp_sum_ni = df_unpivot_args_47_imp['importance'].sum()
        imp_sum_ni = float(imp_sum_ni)*float(10)
        imp_sum_ni = round(imp_sum_ni,1)
        predict_NI = predict_NI.astype('float')
        score_ni = float(imp_sum_ni) + float(predict_NI.values)
        
        
        if (score_ni>10.0):
            return (str(10).replace('[','').replace(']',''))
        else:
            return (str(score_ni).replace('[','').replace(']',''))
        
    return render_template("getniscore.html")

#
# Start the server
#

mode = "prod"

if __name__ == '__main__':
    if mode =="dev":
        app.run(host='0.0.0.0', debug=True,threaded=True)
    else:
        serve(app, host='0.0.0.0', port=5000, threads=2, url_prefix="/home")
        

