import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase'; // Asegúrate de que la ruta sea correcta

const Itinerary = () => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        activity: '',
        place: '',
        completed: false,
    });
    const db = getFirestore();

    useEffect(() => {
        if (auth.currentUser) {
            const unsubscribe = onSnapshot(collection(db, 'users', auth.currentUser.uid, 'activities'), (snapshot) => {
                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setActivities(list);
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser]);

    const handleChange = (e) => {
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
    };

    const addActivity = async () => {
        if (Object.values(newActivity).some((value) => !value && value !== false)) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        try {
            if (auth.currentUser) {
                await addDoc(collection(db, 'users', auth.currentUser.uid, 'activities'), newActivity);
                setNewActivity({ activity: '', place: '', completed: false });
            } else {
                alert('Usuario no autenticado.');
            }
        } catch (error) {
            console.error('Error al agregar actividad:', error);
        }
    };

    const removeActivity = async (id) => {
        try {
            if (auth.currentUser) {
                await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'activities', id));
            }
        } catch (error) {
            console.error('Error al eliminar actividad:', error);
        }
    };

    const toggleComplete = async (id, completed) => {
        try{
            if (auth.currentUser){
                await updateDoc(doc(db, 'users', auth.currentUser.uid, 'activities', id),{completed: !completed})
            }
        } catch (error){
            console.error('Error al actualizar actividad:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 font-sans">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Cositas para hacer📝</h2>

            <div className="space-y-4 mb-6">
                {/* ... (resto del formulario) ... */}
            </div>

            <button
                onClick={addActivity}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
            >
                Agregar Actividad
            </button>

            <ul className="mt-6 space-y-4">
                {activities.map((activity) => (
                    <li
                        key={activity.id}
                        className={`p-4 rounded-lg border border-gray-200 flex items-center justify-between ${
                            activity.completed ? 'bg-green-100 border-green-300' : 'bg-red-50 border-red-200'
                        }`}
                    >
                        <div className="flex items-center flex-grow">
                            <input
                                type="checkbox"
                                checked={activity.completed}
                                onChange={() => toggleComplete(activity.id, activity.completed)}
                                className="mr-2 transform scale-125"
                            />
                            <div className="flex-grow">
                                <div className="font-semibold text-gray-900">{activity.activity}</div>
                                <div className="text-sm text-gray-600">{activity.place}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => removeActivity(activity.id)}
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

export default Itinerary;