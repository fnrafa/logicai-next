import React from 'react';
import {AlertInterface} from '@/context/Alert';

interface AlertContainerProps {
    alerts: AlertInterface[];
}

const Alert: React.FC<AlertContainerProps> = ({alerts}) => {
    return (
        <div
            className="fixed top-5 right-5 left-5 md:left-auto md:right-2 flex flex-col gap-4 z-[9999] max-w-sm mx-auto md:mx-0">
            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className={`flex items-start gap-3 px-5 py-3 rounded-lg shadow-lg border-l-4 
                    transition-transform duration-500 ease-in-out transform ${
                        alert.visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
                    }
                    ${
                        alert.type === 'success'
                            ? 'bg-accent-400 border-accent-600 text-white'
                            : 'bg-secondary-50 border-secondary-900 text-white'
                    }`}
                >
                    <div className="flex-shrink-0 mt-1">
                        {alert.type === 'success' && (
                            <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m7 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        )}
                        {alert.type === 'info' && (
                            <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                                />
                            </svg>
                        )}
                        {alert.type === 'error' && (
                            <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>

                    <p className="text-sm font-medium break-words max-w-[250px] sm:max-w-full overflow-hidden text-ellipsis justify-center py-1">
                        {alert.message}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Alert;
