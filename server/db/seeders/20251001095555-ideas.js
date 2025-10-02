"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Ideas",
      [
        {
          title: "Темная тема для приложения",
          description:
            "Добавить возможность переключения между светлой и темной темой для комфортного использования в вечернее время",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Мобильное приложение",
          description:
            "Разработать нативное мобильное приложение для iOS и Android с полным функционалом платформы",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Интеграция с календарем",
          description:
            "Добавить синхронизацию с Google Calendar, Apple Calendar и Outlook для напоминаний о событиях",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Экспорт данных в PDF",
          description:
            "Реализовать функцию экспорта отчетов и данных в PDF формат с возможностью кастомизации",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Умные уведомления",
          description:
            "Внедрить систему умных уведомлений, которые показываются в нужный момент на основе поведения пользователя",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Геймификация процесса",
          description:
            "Добавить систему достижений, бейджей и рейтингов для повышения вовлеченности пользователей",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Голосовой помощник",
          description:
            "Интегрировать голосового помощника для управления основными функциями приложения",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Оффлайн-режим",
          description:
            "Реализовать возможность работы без интернета с последующей синхронизацией данных",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Расширенная аналитика",
          description:
            "Добавить детальную аналитику использования приложения с графиками и отчетами",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Система шаблонов",
          description:
            "Создать библиотеку готовых шаблонов для быстрого старта новых проектов",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Коллаборативная работа",
          description:
            "Добавить функцию совместного редактирования в реальном времени для командной работы",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Интеграция с Slack",
          description:
            "Создать бота для Slack для получения уведомлений и быстрых действий из чата",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Многоязычная поддержка",
          description:
            "Добавить перевод интерфейса на основные языки: английский, испанский, французский, немецкий",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "API для разработчиков",
          description:
            "Создать публичное API для интеграции с другими сервисами и создания расширений",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Система плагинов",
          description:
            "Разработать архитектуру плагинов для расширения функциональности сторонними разработчиками",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Ideas", null, {});
  },
};
