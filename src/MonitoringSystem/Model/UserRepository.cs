﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonitoringSystem.Hashcomputer;

namespace MonitoringSystem.Model
{
    public class UserRepository
	{
		private static UserRepository _singelton;
		private List<User> _rep;
		private int counter;

		private UserRepository()
		{
			_rep = new List<User>()
			{
				new User()
				{
					Id = 1,
					Name = "admin",
					Login = "admin",
					Password = HashcomputerSHA512.GetHash("admin")
				},
				new User()
				{
					Id = 2,
					Name = "vasya",
					Login = "vasya",
					Password = HashcomputerSHA512.GetHash("vasya")
				}
			};

			counter = _rep.Count;
		}

		public static UserRepository Instance()
		{
			if (_singelton == null)
			{
				_singelton = new UserRepository();
			}

			return _singelton;
		}

		public void Add(User user)
		{
			counter++;
			user.Id = counter;
			_rep.Add(user);
		}

		public User GetById(int id)
		{
			return _rep.FirstOrDefault(user => user.Id == id);
		}

		public User GetByLogin(string login)
		{
			return _rep.FirstOrDefault(user => user.Login == login);
		}

		public IEnumerable<User> GetAll()
		{
			foreach (var user in _rep)
			{
				yield return user;
			}
		}
	}
}
