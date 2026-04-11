import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">

            <div className="flex space-x-3">
                <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></span>
                <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></span>
            </div>

            <p className="mt-6 text-lg tracking-wide text-gray-400">
                Loading the Products...
            </p>
        </div>
    )
}

export default Loading