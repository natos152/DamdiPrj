﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Appointments
    {
        int app_id;
        int station_code;
        string personal_id;
        string app_time;

        public Appointments(int station_code, string personal_id, string app_time)
        {
            Station_code = station_code;
            Personal_id = personal_id;
            App_time = app_time;
        }

        public int App_id { get => app_id; set => app_id = value; }
        public int Station_code { get => station_code; set => station_code = value; }
        public string Personal_id { get => personal_id; set => personal_id = value; }
        public string App_time { get => app_time; set => app_time = value; }
    }
}