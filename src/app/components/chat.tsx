"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef: any = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  function isUser(role: string, content: string) {
    if (role === "user") {
      return (
        <div className="col-start-6 col-end-13 py-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FF0053] flex-shrink-0">
              🫵
            </div>
            <div className="relative mr-3 text-sm bg-[#FF0053] py-2 px-4 shadow rounded-xl">
              <div>{content}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-start-1 col-end-8 py-3 rounded-lg">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#8549FF] flex-shrink-0">
              🤖
            </div>
            <div className="relative ml-3 text-sm bg-[#8549FF] py-2 px-4 shadow rounded-xl">
              <div>
                {content}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex flex-col h-full max-w-xl mx-auto overflow-x-auto mt-4 rounded">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {/* YOU */}
            {isUser("user", 'Hola.')}
            {/* BOT */}
            {isUser("system", '¡Hola! Soy un experto en marketing y mi función es crear textos promocionales. Si necesitas ayuda me indicas tu nicho de mercado, productos o servicios y estaré encantado de ayudarte a generar un texto promocional efectivo para tus SMS.')}

            {messages.map((message) => isUser(message.role, message.content))}

            <div ref={messagesEndRef} />

          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center mt-8">
        <label className="flex px-3 mb-4"></label>
        <input
          className="w-full max-w-xl px-4 py-2 m-auto mb-8 text-sm border
          border-gray-400 rounded-full shadow-2xl bottom-4"
          placeholder="Escribe tu nicho de mercado"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
}
