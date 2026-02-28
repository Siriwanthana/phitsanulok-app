import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabaseClient';

export default function PhitsanulokScreen() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  async function fetchPlaces() {
    try {
      const { data, error } = await supabase.from('Places').select('*');
      if (data) {
        setPlaces(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}><ActivityIndicator size="large" /><Text>กำลังโหลด...</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>เที่ยวเมืองพิษณุโลก ({places.length})</Text>
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()} // แก้ปัญหา toString ที่พังตะกี้
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image_url && <Image source={{ uri: item.image_url }} style={styles.image} />}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name || 'ไม่มีชื่อสถานที่'}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <View style={styles.buttonGroup}>
                {item.latitude && (
                  <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(`https://www.google.com/maps?q=${item.latitude},${item.longitude}`)}>
                    <Text style={styles.btnText}>📍 นำทาง</Text>
                  </TouchableOpacity>
                )}
                {item.phone && (
                  <TouchableOpacity style={[styles.btn, {backgroundColor: '#2ecc71'}]} onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                    <Text style={styles.btnText}>📞 โทรออก</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 },
  card: { backgroundColor: '#fff', margin: 10, borderRadius: 10, elevation: 5, overflow: 'hidden' },
  image: { width: '100%', height: 150 },
  info: { padding: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  category: { color: 'blue', fontSize: 14 },
  address: { color: '#666', fontSize: 12 },
  buttonGroup: { flexDirection: 'row', marginTop: 10 },
  btn: { backgroundColor: '#3498db', padding: 8, borderRadius: 5, marginRight: 10 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});