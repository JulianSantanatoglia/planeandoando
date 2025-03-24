import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase'; // Asegúrate de que la ruta sea correcta

const BarsRestaurants = () => {
    const [places, setPlaces] = useState([]);
    const [newPlace, setNewPlace] = useState({
        name: '',
        location: '',
    });
    const db = getFirestore();

    useEffect(() => {
        if (auth.currentUser) {
            const unsubscribe = onSnapshot(collection(db, 'users', auth.currentUser.uid, 'places'), (snapshot) => {
                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPlaces(list);
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser]);

    const handleChange = (e) => {
        setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
    };

    const addPlace = async () => {
        if (Object.values(newPlace).some((value) => !value)) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        try {
            if (auth.currentUser) {
                await addDoc(collection(db, 'users', auth.currentUser.uid, 'places'), newPlace);
                setNewPlace({ name: '', location: '' });
            } else {
                alert('Usuario no autenticado.');
            }
        } catch (error) {
            console.error('Error al agregar lugar:', error);
        }
    };

    const removePlace = async (id) => {
        try {
            if (auth.currentUser) {
                await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'places', id));
            }
        } catch (error) {
            console.error('Error al eliminar lugar:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 font-sans">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Bares y Restaurantes🍽🍺</h2>

            <div className="space-y-4 mb-6">
                {/* ... (resto del formulario) ... */}
            </div>

            <button
                onClick={addPlace}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
            >
                Agregar Lugar
            </button>

            <ul className="mt-6 space-y-4">
                {places.map((place) => (
                    <li
                        key={place.id}
                        className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                    >
                        <div className="flex-grow">
                            <div className="font-semibold text-gray-900">{place.name}</div>
                            <div className="text-sm text-gray-600">{place.location}</div>
                        </div>
                        <button
                            onClick={() => removePlace(place.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm focus:ring focus:ring-red-200 focus:outline-none"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BarsRestaurants;