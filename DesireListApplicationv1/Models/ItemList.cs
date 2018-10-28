using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesireListApplicationv1.Models
{
    public class ItemList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Item> Items { get; set; }

        public ItemList()
        {
            Id = 0;
            Name = string.Empty;
            Items = new List<Item>();
        }
    }
}