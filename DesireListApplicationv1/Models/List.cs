using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesireListApplicationv1.Models
{
    public class List
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Item> Items { get; set; }

        public List()
        {
            Id = 0;
            Name = string.Empty;
            Items = new List<Item>();
        }
    }
}