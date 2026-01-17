import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useApiStore } from '../store/apiStore';
import type { SecurityAlertEvent, FlightUpdateEvent } from '../types/api.types';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000';

export function useWebSocket() {
    const socketRef = useRef<Socket | null>(null);
    const addSecurityAlert = useApiStore((state) => state.addSecurityAlert);
    const addFlightUpdate = useApiStore((state) => state.addFlightUpdate);

    const connect = useCallback(() => {
        if (socketRef.current?.connected) return;

        socketRef.current = io(WS_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current.on('connect', () => {
            console.log('[WebSocket] Connected to server');
        });

        socketRef.current.on('disconnect', (reason) => {
            console.log('[WebSocket] Disconnected:', reason);
        });

        socketRef.current.on('securityAlert', (alert: SecurityAlertEvent) => {
            console.log('[WebSocket] Security alert received:', alert);
            addSecurityAlert(alert);
        });

        socketRef.current.on('flightUpdate', (update: FlightUpdateEvent) => {
            console.log('[WebSocket] Flight update received:', update);
            addFlightUpdate(update);
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('[WebSocket] Connection error:', error);
        });
    }, [addSecurityAlert, addFlightUpdate]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, []);

    const sendMessage = useCallback((event: string, data: unknown) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit(event, data);
        }
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    return {
        socket: socketRef.current,
        isConnected: socketRef.current?.connected ?? false,
        connect,
        disconnect,
        sendMessage,
    };
}

export default useWebSocket;
