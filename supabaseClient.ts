import { createClient } from '@supabase/supabase-js'

//https://osggcplkyfofquxfobuu.supabase.co
const supabaseUrl = 'https://osggcplkyfofquxfobuu.supabase.co' 

//sb_publishable_Wyft17FcWznkHYi1htyZkQ_ACK4S0mq
const supabaseAnonKey = 'sb_publishable_Wyft17FcWznkHYi1htyZkQ_ACK4S0mq' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)