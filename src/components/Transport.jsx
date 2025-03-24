import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase'; // Asegúrate de que la ruta sea correcta

const Transport = () => {
    const [transports, setTransports] = useState([]);
    const [newTransport, setNewTransport] = useState({
        type: 'Avion',
        origin: '',
        destination: '',
        date: '',
        price: '',
        people: 1,
    });
    const db = getFirestore();

    useEffect(() => {
        if (auth.currentUser) {
            const unsubscribe = onSnapshot(collection(db, 'users', auth.currentUser.uid, 'transports'), (snapshot) => {
                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setTransports(list);
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser]);

    const handleChange = (e) => {
        setNewTransport({ ...newTransport, [e.target.name]: e.target.value });
    };

    const addTransport = async () => {
        if (Object.values(newTransport).some((value) => !value)) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        try {
            if (auth.currentUser) {
                await addDoc(collection(db, 'users', auth.currentUser.uid, 'transports'), newTransport);
                setNewTransport({ type: 'Avion', origin: '', destination: '', date: '', price: '', people: 1 });
            } else {
                alert('Usuario no autenticado.');
            }
        } catch (error) {
            console.error('Error al agregar el traslado:', error);
        }
    };

    const removeTransport = async (id) => {
        try {
            if (auth.currentUser) {
                await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'transports', id));
            }
        } catch (error) {
            console.error('Error al eliminar el traslado:', error);
        }
    };

    const calculateTotal = () => {
        return transports.reduce((total, transport) => {
            return total + (parseFloat(transport.price) * transport.people);
        }, 0);
    };

    const total = calculateTotal().toFixed(2);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 font-sans">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Traslados</h2>

            <div className="space-y-4 mb-6">
                {/* ... (resto del formulario) ... */}
            </div>

            <button
                onClick={addTransport}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
            >
                Agregar
            </button>

            <ul className="mt-6 space-y-4">
                {transports.map((transport, index) => (
                    <li
                        key={index}
                        className="p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                    >
                        <div className="flex-grow">
                            <div className="font-semibold text-gray-900">{transport.type}</div>
                            <div className="text-sm text-gray-600">
                                {transport.origin} - {transport.destination}
                            </div>
                            <div className="text-sm text-gray-600">
                                {transport.date} | €{transport.price} x {transport.people} personas = €{transport.price * transport.people}
                            </div>
                        </div>
                        <button
                            onClick={() => removeTransport(transport.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm focus:ring focus:ring-red-200 focus:outline-none"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <p className="font-semibold text-gray-900">Total: €{total}</p>
            </div>
        </div>
    );
};

export default Transport;